// 最基本的 vDom
function createTextVDom(text) {
  return {
    type: 'TEXT',
    props: {
      nodeValue: text,
      children: []
    }
  }
}

function createElement(type, props, ...children) {
  // 核心逻辑不复杂，将参数都房到一个对象上返回就行
  // 将 children 放到 props 当中，这样我们在组件里面就能通过 this.props.children 拿到子元素
  return {
    type,
    props: {
      ...props,
      children: children.map(child => {
        return typeof child === 'object' ? child : createTextVDom(child)
      })
    }
  }
}

// 创建 DOM 的操作
function createDom(vDom) {
  let dom
  // 检查当前节点是文本还是对象
  if (vDom.type === 'TEXT') {
    dom = document.createTextNode(vDom.props.nodeValue)
  } else {
    dom = document.createElement(vDom.type)
    // 将 vDom 上除了 children 外的属性都挂载到真正的 DOM 上去
    if (vDom.props) {
      Object.keys(vDom.props)
        .filter(key => key !== 'children')
        .forEach(item => {
          if (item.indexOf('on') === 0) {
            dom.addEventListener(item.substr(2).toLowerCase(), vDom.props[item], false)
          } else {
            dom[item] = vDom.props[item]
          }
        })
    }
  }
  return dom
}

// 更新 DOM 的操作
function updateDom(dom, prevProps, nextProps) {
  // 1. 过滤 children 属性
  // 2. 老的存在，新的没了，取消
  // 3. 新的存在，老的没有，新增
  Object.keys(prevProps)
    .filter(name => name !== 'children')
    .filter(name => !(name in nextProps))
    .forEach(name => {
      if (name.indexOf('on') === 0) {
        dom.removeEventListener(name.substr(2).toLowerCase(), prevProps[name], false)
      } else {
        dom[name] = ''
      }
    })
  Object.keys(nextProps)
    .filter(name => name !== 'children')
    .forEach(name => {
      if (name.indexOf('on') === 0) {
        dom.addEventListener(name.substr(2).toLowerCase(), nextProps[name], false)
      } else {
        dom[name] = nextProps[name]
      }
    })
}

// 统一操作 DOM
function commitRoot() {
  deletions.forEach(commitRootImpl)         // 执行真正的节点删除
  commitRootImpl(workInProgressRoot.child)  // 开启递归
  currentRoot = workInProgressRoot          // 记录一下 currentRoot
  workInProgressRoot = null                 // 操作完后将 workInProgressRoot 重置
}

function commitDeletion(fiber, domParent) {
  if (fiber.dom) {
    domParent.removeChild(fiber.dom)        // DOM 存在，是普通节点
  } else {
    commitDeletion(fiber.child, domParent)  // DOM 不存在，是函数组件，向下递归查找真实 DOM
  }
}

function commitRootImpl(fiber) {
  if (!fiber) {
    return
  }

  // 不再直接获取，而是向上查找真正的 DOM
  // const parentDom = fiber.return.dom
  let parentFiber = fiber.return
  while (!parentFiber.dom) {
    parentFiber = parentFiber.return
  }
  const parentDom = parentFiber.dom

  if (fiber.effectTag === 'REPLACEMENT' && fiber.dom) {
    parentDom.appendChild(fiber.dom)
  } else if (fiber.effectTag === 'DELETION') {
    // 这里也不再使用 parentDom.removeChild(fiber.dom)
    commitDeletion(fiber, parentDom)
  } else if (fiber.effectTag === 'UPDATE' && fiber.dom) {
    // 更新 DOM 属性
    updateDom(fiber.dom, fiber.alternate.props, fiber.props)
  }

  // 递归操作子元素和兄弟元素
  commitRootImpl(fiber.child)
  commitRootImpl(fiber.sibling)
}

// 任务调度，使用 workLoop 用来调度任务
let nextUnitOfWork = null
let workInProgressRoot = null
let currentRoot = null
let deletions = null
function workLoop(deadline) {
  while (nextUnitOfWork && deadline.timeRemaining() > 1) {
    // 这个 while 循环会在任务执行完或者时间到了的时候结束
    nextUnitOfWork = performUnitOfWork(nextUnitOfWork)
  }

  // 任务做完后统一渲染
  if (!nextUnitOfWork && workInProgressRoot) {
    commitRoot()
  }

  // 如果任务还没完，但是时间到了，我们需要继续注册 requestIdleCallback
  requestIdleCallback(workLoop)
}

function buildNewFiber(fiber, workInProgressFiber) {
  return {
    type: fiber.type,
    props: fiber.props,
    dom: null,                    // 构建 fiber 时没有 DOM，下次 perform 这个节点是才创建 DOM 
    return: workInProgressFiber,
    alternate: null,              // 新增的没有老状态
    effectTag: 'REPLACEMENT'      // 添加一个操作标记
  }
}

function reconcileChildren(workInProgressFiber, elements) {
  // 构建 fiber 结构
  let oldFiber = workInProgressFiber.alternate
    && workInProgressFiber.alternate.child         // 获取上次的 fiber 树
  let prevSibling = null

  let index = 0
  if (elements && elements.length) {
    if (!oldFiber) {                               // 第一次没有 oldFiber，那全部是 REPLACEMENT
      for (let i = 0; i < elements.length; i++) {
        const element = elements[i]
        const newFiber = buildNewFiber(element, workInProgressFiber)
        if (i === 0) {                             // 父级的 child 指向第一个子元素
          workInProgressFiber.child = newFiber
        } else {
          prevSibling.sibling = newFiber           // 每个子元素拥有指向下一个子元素的指针
        }
        prevSibling = newFiber
      }
    }

    while (index < elements.length && oldFiber) {
      let element = elements[index]
      let newFiber = null
      const sameType = oldFiber                    // 对比 oldFiber 和当前 element（检测类型是否一样）
        && element
        && oldFiber.type === element.type
      if (sameType) {                              // 先比较元素类型，如果类型一样，复用节点，更新 props
        newFiber = {
          type: oldFiber.type,
          props: element.props,
          dom: oldFiber.dom,
          return: workInProgressFiber,
          alternate: oldFiber,                     // 记录下上次状态
          effectTag: 'UPDATE'                      // 添加一个操作标记
        }
      } else if (!sameType && element) {           // 如果类型不一样，有新的节点，创建新节点替换老节点
        newFiber = buildNewFiber(element, workInProgressFiber)
      } else if (!sameType && oldFiber) {          // 如果类型不一样，没有新节点，有老节点，删除老节点
        oldFiber.effectTag = 'DELETION'            // 添加删除标记
        deletions.push(oldFiber)                   // 一个数组收集所有需要删除的节点
      }
      oldFiber = oldFiber.sibling                  // 循环处理兄弟元素
      if (index === 0) {                           // 父级的child指向第一个子元素
        workInProgressFiber.child = newFiber
      } else {
        prevSibling.sibling = newFiber             // 每个子元素拥有指向下一个子元素的指针
      }
      prevSibling = newFiber
      index++
    }
  }
}

// 申明两个全局变量，用来处理 useState
// wipFiber 是当前的函数组件 fiber 节点
// hookIndex 是当前函数组件内部 useState 状态计数
let wipFiber = null
let hookIndex = null
function useState(init) {
  const oldHook = wipFiber.alternate        // 取出上次的 Hook
    && wipFiber.alternate.hooks
    && wipFiber.alternate.hooks[hookIndex]
  const hook = {                            // Hook 数据结构
    state: oldHook ? oldHook.state : init   // state 是每个具体的值
  }
  wipFiber.hooks.push(hook)                 // 将所有 useState 调用按照顺序存到 fiber 节点上
  hookIndex++
  const setState = value => {               // 修改 state 的方法
    hook.state = value
    workInProgressRoot = {                  // 只要修改了 state，我们就需要重新处理这个节点
      dom: currentRoot.dom,
      props: currentRoot.props,
      alternate: currentRoot
    }
    // 修改 nextUnitOfWork 指向 workInProgressRoot，这样下次 requestIdleCallback 就会处理这个节点了
    nextUnitOfWork = workInProgressRoot
    deletions = []
  }
  return [hook.state, setState]
}

function updateFunctionComponent(fiber) {
  wipFiber = fiber                            // 支持 useState，初始化变量
  hookIndex = 0
  wipFiber.hooks = []                         // Hooks 用来存储具体的 state 序列
  const children = [fiber.type(fiber.props)]  // 函数组件的 type 就是个函数，直接拿来执行可以获得 DOM 元素
  reconcileChildren(fiber, children)
}

// updateHostComponent 就是之前的操作，只是单独抽取了一个方法
function updateHostComponent(fiber) {
  if (!fiber.dom) {
    // 创建一个 DOM 挂载上去
    fiber.dom = createDom(fiber)
  }

  // 将我们前面的 vDom 结构转换为 fiber 结构
  const elements = fiber.props.children

  // 协调子元素
  reconcileChildren(fiber, elements)
}

// performUnitOfWork 用来执行任务，参数是我们的当前 fiber 任务，返回值是下一个任务
function performUnitOfWork(fiber) {
  // 检测函数组件
  const isFunctionComponent = fiber.type instanceof Function
  if (isFunctionComponent) {
    updateFunctionComponent(fiber)
  } else {
    updateHostComponent(fiber)
  }

  // 这个函数的返回值是下一个任务，这其实是一个深度优先遍历
  // 先找子元素，没有子元素了就找兄弟元素，兄弟元素也没有了就返回父元素
  // 然后再找这个父元素的兄弟元素，最后到根节点结束
  // 这个遍历的顺序其实就是从上到下，从左到右
  if (fiber.child) {
    return fiber.child
  }

  let nextFiber = fiber

  while (nextFiber) {
    if (nextFiber.sibling) {
      return nextFiber.sibling
    }
    nextFiber = nextFiber.return
  }
}

// 使用 requestIdleCallback 开启 workLoop
requestIdleCallback(workLoop)

function render(vDom, container) {
  workInProgressRoot = {
    dom: container,
    props: {
      children: [vDom]
    },
    alternate: currentRoot
  }
  deletions = []
  nextUnitOfWork = workInProgressRoot
}

class Component {
  constructor(props) {
    this.props = props
  }
}

function transfer(Component) {
  return function (props) {
    const component = new Component(props)
    let [state, setState] = useState(component.state)
    component.props = props
    component.state = state
    component.setState = setState
    return component.render()
  }
}

export default {
  createElement,
  render,
  useState,
  Component,
  transfer
}