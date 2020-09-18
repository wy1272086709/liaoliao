function _withPX(num) {
  return num + 'px'
}

export default class BottomImageMenu {
  constructor(menus = [], callback) {
    this.menus = menus
    this.screenWidth = plus.screen.resolutionWidth
    this.viewMargin = 10
    this.menuMargin = 10
    this.colCount = 4
    this.cancelViewHeight = 45
    this.radius = 10
    this.menuViewWidth = this.screenWidth - (2 * this.viewMargin)
    this.menuWidth = Math.floor(this.menuViewWidth / this.colCount)
    this.rowCount = Math.ceil(this.menus.length / this.colCount)
    // 菜单元素高度
    this.menuViewHeight = this.rowCount * this.menuWidth
    this.callback = callback
    this.touchMoveout = false
    this.cancelViewPostion = {
      left: _withPX(this.viewMargin),
      right: _withPX(this.viewMargin),
      bottom: _withPX(this.viewMargin),
      height: _withPX(this.cancelViewHeight)
    }
    this.currentTouchViewPosition = []
    this.init()
  }

  init() {
    this.createNvMask()
    this.createNvMenuView()
  }

  // 创建遮罩层
  createNvMask() {
    const nvMask = new plus.nativeObj.View('nvMask', {
      top: '0px',
      left: '0px',
      height: '100%',
      width: '100%',
      backgroundColor: 'rgba(0,0,0,0.5)'
    })
    //处理遮罩层点击
    // nvMask.addEventListener("click", e => {
    //   this.close()
    // })
    nvMask.addEventListener('touchend', ({ clientX, clientY }) => {
      this.close()
    })
    this.nvMask = nvMask
  }

  // 创建菜单view
  createNvMenuView() {

    const nvMenuView = new plus.nativeObj.View('nvMenuView', {
      bottom: '0px',
      left: '0px',
      height: _withPX(this.menuViewHeight + this.cancelViewHeight + this.viewMargin * 2),
      width: '100%'
    })

    // 绘制菜单
    nvMenuView.drawRect({ color: "#FFFFFF", radius: _withPX(this.radius) }, {
      top: '0px',
      left: _withPX(this.viewMargin),
      right: _withPX(this.viewMargin),
      height: _withPX(this.menuViewHeight)
    })

    // 绘制取消按钮
    this._drawCancel(nvMenuView)

    const maxClientY = this.menuViewHeight + this.viewMargin * 2 + this.cancelViewHeight,
      maxClientX = this.screenWidth - this.viewMargin,
      minClientX = this.viewMargin,
      minCancelClientY = this.menuViewHeight + this.viewMargin,
      maxCancelClientY = this.menuViewHeight + this.viewMargin + this.cancelViewHeight;
    nvMenuView.addEventListener('touchstart', ({ clientX, clientY }) => {
      if (clientY >= minCancelClientY && clientY <= maxCancelClientY) {
        return this.close()
      }
      const { menuIndex, position } = this._findTouchMenuIndex(clientX, clientY)
      if (menuIndex >= 0) {
        const clickMenu = this.menus[menuIndex]
        if (clickMenu) {
          if (clickMenu.onClick) {
            clickMenu.onClick()
          } else {
            this.callback(clickMenu, menuIndex)
          }
        }
      }
    })
    // touch 事件
    // nvMenuView.addEventListener('touchstart', ({ clientX, clientY }) => {
    //   this.touchMoveout = false
    //   // 取消按钮
    //   if (clientY >= minCancelClientY && clientY <= maxCancelClientY) {
    //     this.currentTouchViewPosition = [
    //       [minClientX, minCancelClientY],
    //       [maxClientX, maxCancelClientY]
    //     ]
    //   }

    //   const { menuIndex, position } = this._findTouchMenuIndex(clientX, clientY)

    //   if (menuIndex >= 0) {
    //     this.currentTouchViewPosition = position
    //     this._drawMenu(nvMenuView, { touchIndex: menuIndex })
    //   }
    // })

    // nvMenuView.addEventListener('touchmove', ({ clientX, clientY }) => {
    //   let [min, max] = this.currentTouchViewPosition
    //   if (!min || !max) return
    //   if (clientX < min[0] || clientX > max[0] || clientY < min[1] || clientY > max[1]) {
    //     this.touchMoveout = true
    //     this._drawMenu(nvMenuView)
    //     this._drawCancel(nvMenuView)
    //   }
    // })

    // nvMenuView.addEventListener('touchend', ({ clientX, clientY }) => {
    //   console.log("touchend", `X : ${clientX} ,  Y : ${clientY}`)
    //   if (this.touchMoveout) return
    //   // 边缘不触发事件
    //   if (clientX < this.viewMargin || clientX > maxClientX || clientY > maxClientY) return

    //   if (clientX < min[0] || clientX > max[0] || clientY < min[1] || clientY > max[1]) {

    //   }
    //   // if (clientY < minCancelClientY || clientY > maxCancelClientY) {
    //   //   return this.close()
    //   // }
    //   // 菜单
    //   const { menuIndex, position } = this._findTouchMenuIndex(clientX, clientY)
    //   if (menuIndex >= 0) {
    //     this._drawMenu(nvMenuView)
    //     const clickMenu = this.menus[menuIndex]
    //     if (clickMenu) {
    //       if (clickMenu.onClick) {
    //         clickMenu.onClick()
    //       } else {
    //         this.callback(clickMenu, menuIndex)
    //       }
    //     }
    //   }
    // })

    this._drawMenu(nvMenuView, { menus: this.menus })

    this.nvMenuView = nvMenuView
  }

  // 找到点击的菜单索引
  _findTouchMenuIndex(clientX, clientY) {
    let menuIndex, colIndex, rowIndex;
    if (clientY > 0 && clientY <= this.menuViewHeight) {
      // 列索引
      colIndex = Math.floor((clientX - this.viewMargin) / this.menuWidth)
      // 行索引
      rowIndex = Math.floor((clientY - this.menuMargin) / this.menuWidth)
      // 菜单索引
      menuIndex = this.colCount * rowIndex + colIndex

      // let minX = (colIndex <= 0 ? 0 : (colIndex - 1) * this.menuWidth) + this.menuWidth
      // let minY = (rowIndex <= 0 ? 0 : (rowIndex - 1) * this.menuWidth) + this.menuWidth
      // let maxX = (colIndex <= 0 ? 0 : colIndex * this.menuWidth) + this.menuWidth
      // let maxY = (rowIndex <= 0 ? 0 : rowIndex * this.menuWidth) + this.menuWidth
      // position = [
      //   [minX, minY],
      //   [maxX, maxY]
      // ]
    }
    return { menuIndex, colIndex, rowIndex, }
  }

  _drawMenu(view, params = {}) {
    const { menus = this.menus, touchIndex } = params
    const _menusDraws = []
    const menuLabelHeight = 20
    let lastMenuClientX = this.viewMargin
    menus.forEach((item, index) => {
      const rowNumber = Math.ceil((index + 1) / this.colCount)
      const currentMenuClientY = (rowNumber - 1) * this.menuWidth
      const iconWidth = this.menuWidth - this.menuMargin * 2 - menuLabelHeight

      const opacity = touchIndex === index ? 0.1 : 0
      _menusDraws.push({
        tag: 'rect',
        id: `rect-${index}`,
        rectStyles: {
          color: `rgba(0,0,0,${opacity})`,
          radius: _withPX(this.radius)
          // borderWidth: '1px',
          // borderColor: '#333',
        },
        position: {
          top: _withPX(currentMenuClientY),
          left: _withPX(lastMenuClientX),
          width: _withPX(this.menuWidth),
          height: _withPX(this.menuWidth),
        }
      })
      _menusDraws.push({
        tag: 'img',
        id: `icon-${index}`,
        src: item.icon,
        position: {
          top: _withPX(currentMenuClientY + this.menuMargin),
          left: _withPX(lastMenuClientX + this.menuMargin + menuLabelHeight / 2),
          width: _withPX(iconWidth),
          height: _withPX(iconWidth),
        }
      })
      _menusDraws.push({
        tag: 'font',
        id: `text-${index}`,
        text: item.label,
        textStyles: {
          size: '14px',
          overflow: 'ellipsis',
          lineSpacing: _withPX(menuLabelHeight),
          verticalAlign: 'middle'
        },
        position: {
          top: _withPX(currentMenuClientY + this.menuMargin + iconWidth),
          left: _withPX(lastMenuClientX),
          width: _withPX(this.menuWidth),
          height: _withPX(menuLabelHeight)
        },
        richTextStyles: { align: 'center' }
      })
      lastMenuClientX = (index + 1) % this.colCount === 0 ? this.viewMargin : lastMenuClientX + this.menuWidth
    })
    view.draw(_menusDraws)
  }

  // 绘制取消按钮
  _drawCancel(view, touched) {
    // view.clearRect(this.cancelViewPostion)
    const bgColor = touched ? 'rgba(0,0,0,0.1)' : '#FFFFFF'
    view.drawRect({ color: bgColor, radius: _withPX(this.radius) }, this.cancelViewPostion)
    view.drawText('取消', this.cancelViewPostion, { align: 'center' })
  }

  show() {
    if (!this.nvMenuView) {
      this.createNvMenuView()
    }
    this.nvMask.show()
    this.nvMenuView.show()
  }

  close() {
    this.nvMask.hide()
    this.nvMenuView.hide()
    this.nvMenuView.close()
    this.nvMenuView = null
  }

}
