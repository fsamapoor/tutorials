// resources/js/components/tutorials.js
function tutorialsComponent() {
  return {
    // You can define any other Alpine.js properties here.
    init: function() {
      console.log("Hello, world!");
      setTimeout(() => {
        this.$el.classList.remove("hidden");
        this.showAction();
      }, 2e3);
    },
    showAction: function() {
      let element = document.querySelector("div.fi-fo-field-wrp");
      let action = document.querySelector("[data-action]");
      let svg = document.querySelector("[data-svg]");
      let wrapper = document.querySelector("[data-wrapper]");
      let dialog = document.querySelector("[data-dialog]");
      const rect = this.getRect(element, 10);
      action.classList.remove("hidden");
      action.style.position = "fixed";
      action.style.left = rect[2].x - action.clientWidth + "px";
      action.style.top = rect[3].y + 10 + "px";
      action.style.zIndex = 1e3;
      wrapper.style.zIndex = 1200;
      const dialogTranslate = -1 * this.$refs.dialogTop.clientHeight;
      console.log("dialogTopheight", dialogTranslate);
      dialog.style.position = "absolute";
      dialog.style.left = rect[0].x + "px";
      dialog.style.top = rect[0].y + "px";
      dialog.style.width = rect[1].x - rect[0].x + 20 + "px";
      dialog.style.transform = "translateX(-10px) translateY(" + -1 * this.$refs.dialogTop.clientHeight + "px)";
      svg.style.height = rect[2].y - rect[0].y + "px";
    },
    getWindowPath: function(radius = 24, offset = { x: 0, y: 0 }, relative = false, positive = false) {
      let element = document.querySelector("div.fi-fo-field-wrp");
      const rect = this.getRect(element, 10, offset, relative, positive);
      let path = "";
      path += "M " + rect[0].x + " " + (rect[0].y + radius) + " ";
      path += "C " + rect[0].x + " " + rect[0].y + " " + rect[0].x + " " + rect[0].y + " " + (rect[0].x + radius) + " " + rect[0].y + " ";
      path += "L " + (rect[1].x - radius) + " " + rect[1].y + " ";
      path += "C " + rect[1].x + " " + rect[1].y + " " + rect[1].x + " " + rect[1].y + " " + rect[1].x + " " + (rect[1].y + radius) + " ";
      path += "L " + rect[2].x + " " + (rect[2].y - radius) + " ";
      path += "C " + rect[2].x + " " + rect[2].y + " " + rect[2].x + " " + rect[2].y + " " + (rect[2].x - radius) + " " + rect[2].y + " ";
      path += "L " + (rect[3].x + radius) + " " + rect[3].y + " ";
      path += "C " + rect[3].x + " " + rect[3].y + " " + rect[3].x + " " + rect[3].y + " " + rect[3].x + " " + (rect[3].y - radius) + " ";
      path += "L " + rect[0].x + " " + (rect[0].y + radius) + " ";
      return path;
    },
    getClipPath: function(radius = 24, offset = { x: 0, y: 0 }, relative = false, absolute = false) {
      let path = "M 0 0 ";
      path += "L 0 " + window.innerHeight + " ";
      path += "L " + window.innerWidth + " " + window.innerHeight + " ";
      path += "L " + window.innerWidth + " 0 ";
      path += "L 0 0 ";
      path += this.getWindowPath(radius, offset, relative, absolute);
      return path;
    },
    getClipPathOld: function(element, margin = 10) {
      let path = "polygon(0% 0%,100% 0%,100% 100%,0% 100%,0% 0%,";
      element = document.querySelector("input.fi-input");
      const rect = this.getRect(element);
      const actionRect = this.getRect(
        element,
        10,
        {
          x: 0,
          y: element.clientHeight + 10
        }
      );
      path += rect[0].x + "px " + rect[0].y + "px, ";
      path += rect[3].x + "px " + rect[3].y + "px, ";
      path += rect[2].x + "px " + rect[2].y + "px, ";
      path += rect[1].x + "px " + rect[1].y + "px, ";
      path += rect[0].x + "px " + rect[0].y + "px";
      path += ")";
      console.log(element.offsetLeft, element.offsetTop, element.clientWidth, element.clientHeight);
      console.log("[clip-path:" + path);
      return "clip-path: " + path;
    },
    getRect: function(element, margin = 10, offset = { x: 0, y: 0 }, relative = false, positive = false) {
      const left = relative ? 0 : element.offsetLeft;
      const top = relative ? 0 : element.offsetTop;
      let result = [
        {
          x: left - margin + offset.x,
          y: top - margin + offset.y
        },
        {
          x: left + element.clientWidth + margin + offset.x,
          y: top - margin + offset.y
        },
        {
          x: left + element.clientWidth + margin + offset.x,
          y: top + element.clientHeight + margin + offset.y
        },
        {
          x: left - margin + offset.x,
          y: top + element.clientHeight + margin + offset.y
        }
      ];
      if (positive) {
        let minX = 0;
        let minY = 0;
        for (let i = 0; i < result.length; i++) {
          if (result[i].x < minX) {
            minX = result[i].x;
          }
          if (result[i].y < minY) {
            minY = result[i].y;
          }
        }
        for (let i = 0; i < result.length; i++) {
          result[i].x -= minX;
          result[i].y -= minY;
        }
      }
      return result;
    }
    // You can define any other Alpine.js functions here.
  };
}
export {
  tutorialsComponent as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vY29tcG9uZW50cy90dXRvcmlhbHMuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIEltcG9ydCBhbnkgZXh0ZXJuYWwgSmF2YVNjcmlwdCBsaWJyYXJpZXMgZnJvbSBOUE0gaGVyZS5cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gdHV0b3JpYWxzQ29tcG9uZW50KCkge1xuICAgIHJldHVybiB7XG4gICAgICAgIC8vIFlvdSBjYW4gZGVmaW5lIGFueSBvdGhlciBBbHBpbmUuanMgcHJvcGVydGllcyBoZXJlLlxuXG4gICAgICAgIGluaXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdIZWxsbywgd29ybGQhJyk7XG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLiRlbC5jbGFzc0xpc3QucmVtb3ZlKCdoaWRkZW4nKTtcbiAgICAgICAgICAgICAgICB0aGlzLnNob3dBY3Rpb24oKTtcbiAgICAgICAgICAgIH0sIDIwMDApO1xuICAgICAgICAgICAgLy8gSW5pdGlhbGlzZSB0aGUgQWxwaW5lIGNvbXBvbmVudCBoZXJlLCBpZiB5b3UgbmVlZCB0by5cbiAgICAgICAgfSxcblxuICAgICAgICBzaG93QWN0aW9uOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBsZXQgZWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2Rpdi5maS1mby1maWVsZC13cnAnKTtcbiAgICAgICAgICAgIGxldCBhY3Rpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdbZGF0YS1hY3Rpb25dJyk7XG4gICAgICAgICAgICBsZXQgc3ZnID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignW2RhdGEtc3ZnXScpO1xuICAgICAgICAgICAgbGV0IHdyYXBwZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdbZGF0YS13cmFwcGVyXScpO1xuICAgICAgICAgICAgbGV0IGRpYWxvZyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLWRpYWxvZ10nKTtcblxuICAgICAgICAgICAgY29uc3QgcmVjdCA9IHRoaXMuZ2V0UmVjdChlbGVtZW50LCAxMCk7XG5cbiAgICAgICAgICAgIGFjdGlvbi5jbGFzc0xpc3QucmVtb3ZlKCdoaWRkZW4nKTtcblxuICAgICAgICAgICAgYWN0aW9uLnN0eWxlLnBvc2l0aW9uID0gJ2ZpeGVkJztcbiAgICAgICAgICAgIGFjdGlvbi5zdHlsZS5sZWZ0ID0gKHJlY3RbMl0ueCAtIGFjdGlvbi5jbGllbnRXaWR0aCkgKyAncHgnO1xuICAgICAgICAgICAgYWN0aW9uLnN0eWxlLnRvcCA9IChyZWN0WzNdLnkgKyAxMCkgKyAncHgnO1xuICAgICAgICAgICAgYWN0aW9uLnN0eWxlLnpJbmRleCA9IDEwMDA7XG5cbiAgICAgICAgICAgIC8vIHN2Zy5zdHlsZS5wb3NpdGlvbiA9ICdmaXhlZCc7XG4gICAgICAgICAgICAvLyBzdmcuc3R5bGUubGVmdCA9IHJlY3RbMF0ueCArICdweCc7XG4gICAgICAgICAgICAvLyBzdmcuc3R5bGUudG9wID0gcmVjdFswXS55ICsgJ3B4JztcbiAgICAgICAgICAgIC8vIHN2Zy5zdHlsZS56SW5kZXggPSAxMDAwO1xuXG4gICAgICAgICAgICAvLyB3cmFwcGVyLnN0eWxlLnBvc2l0aW9uID0gJ2ZpeGVkJztcbiAgICAgICAgICAgIC8vIHdyYXBwZXIuc3R5bGUubGVmdCA9IHJlY3RbMF0ueCArICdweCc7XG4gICAgICAgICAgICAvLyB3cmFwcGVyLnN0eWxlLnRvcCA9IChyZWN0WzBdLnkgLSA1MCkgKyAncHgnO1xuICAgICAgICAgICAgLy8gd3JhcHBlci5zdHlsZS53aWR0aCA9IChyZWN0WzFdLnggLSByZWN0WzBdLngpICsgJ3B4JztcbiAgICAgICAgICAgIC8vIHdyYXBwZXIuc3R5bGUuaGVpZ2h0ID0gKHJlY3RbMl0ueSAtIHJlY3RbMF0ueSArIDUwICsgNTApICsgJ3B4JztcbiAgICAgICAgICAgIHdyYXBwZXIuc3R5bGUuekluZGV4ID0gMTIwMDtcblxuICAgICAgICAgICAgY29uc3QgZGlhbG9nVHJhbnNsYXRlID0gLTEgKiB0aGlzLiRyZWZzLmRpYWxvZ1RvcC5jbGllbnRIZWlnaHQ7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnZGlhbG9nVG9waGVpZ2h0JywgZGlhbG9nVHJhbnNsYXRlKTtcblxuICAgICAgICAgICAgZGlhbG9nLnN0eWxlLnBvc2l0aW9uID0gJ2Fic29sdXRlJztcbiAgICAgICAgICAgIGRpYWxvZy5zdHlsZS5sZWZ0ID0gcmVjdFswXS54ICsgJ3B4JztcbiAgICAgICAgICAgIGRpYWxvZy5zdHlsZS50b3AgPSAocmVjdFswXS55KSArICdweCc7XG4gICAgICAgICAgICBkaWFsb2cuc3R5bGUud2lkdGggPSAocmVjdFsxXS54IC0gcmVjdFswXS54ICsgMjApICsgJ3B4JztcbiAgICAgICAgICAgIGRpYWxvZy5zdHlsZS50cmFuc2Zvcm0gPSAndHJhbnNsYXRlWCgtMTBweCkgdHJhbnNsYXRlWSgnICsgKC0xICogdGhpcy4kcmVmcy5kaWFsb2dUb3AuY2xpZW50SGVpZ2h0KSArICdweCknO1xuICAgICAgICAgICAgLy8kZWwuc3R5bGUudHJhbnNmb3JtID0gJ3RyYW5zbGF0ZVkoJyArICgtJHJlZnMuZGlhbG9nVG9wLm9mZnNldEhlaWdodCkgKyAnKSc7XG4gICAgICAgICAgICAvLyBkaWFsb2cuc3R5bGUuaGVpZ2h0ID0gKHJlY3RbMl0ueSAtIHJlY3RbMF0ueSkgKyAncHgnO1xuICAgICAgICAgICAgc3ZnLnN0eWxlLmhlaWdodCA9IChyZWN0WzJdLnkgLSByZWN0WzBdLnkpICsgJ3B4JztcblxuICAgICAgICB9LFxuXG4gICAgICAgIGdldFdpbmRvd1BhdGg6IGZ1bmN0aW9uKHJhZGl1cyA9IDI0LCBvZmZzZXQgPSB7eDowLHk6MH0sIHJlbGF0aXZlID0gZmFsc2UsIHBvc2l0aXZlID0gZmFsc2UpIHtcbiAgICAgICAgICAgIGxldCBlbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignZGl2LmZpLWZvLWZpZWxkLXdycCcpO1xuXG4gICAgICAgICAgICBjb25zdCByZWN0ID0gdGhpcy5nZXRSZWN0KGVsZW1lbnQsIDEwLCBvZmZzZXQsIHJlbGF0aXZlLCBwb3NpdGl2ZSk7XG5cbiAgICAgICAgICAgIGxldCBwYXRoID0gJyc7XG4gICAgICAgICAgICBwYXRoICs9ICdNICcgKyByZWN0WzBdLnggKyAnICcgKyAocmVjdFswXS55ICsgIHJhZGl1cykgKyAnICc7XG4gICAgICAgICAgICBwYXRoICs9ICdDICcgKyByZWN0WzBdLnggKyAnICcgKyByZWN0WzBdLnkgKyAnICcgKyByZWN0WzBdLnggKyAnICcgKyByZWN0WzBdLnkgKyAnICcgKyAocmVjdFswXS54ICsgIHJhZGl1cykgKyAnICcgKyByZWN0WzBdLnkgKyAnICc7XG4gICAgICAgICAgICBwYXRoICs9ICdMICcgKyAocmVjdFsxXS54IC0gIHJhZGl1cykgKyAnICcgKyByZWN0WzFdLnkgKyAnICc7XG4gICAgICAgICAgICBwYXRoICs9ICdDICcgKyByZWN0WzFdLnggKyAnICcgKyByZWN0WzFdLnkgKyAnICcgKyByZWN0WzFdLnggKyAnICcgKyByZWN0WzFdLnkgKyAnICcgKyByZWN0WzFdLnggKyAnICcgKyAocmVjdFsxXS55ICsgIHJhZGl1cykgKyAnICc7XG4gICAgICAgICAgICBwYXRoICs9ICdMICcgKyByZWN0WzJdLnggKyAnICcgKyAocmVjdFsyXS55IC0gIHJhZGl1cykgKyAnICc7XG4gICAgICAgICAgICBwYXRoICs9ICdDICcgKyByZWN0WzJdLnggKyAnICcgKyByZWN0WzJdLnkgKyAnICcgKyByZWN0WzJdLnggKyAnICcgKyByZWN0WzJdLnkgKyAnICcgKyAocmVjdFsyXS54IC0gIHJhZGl1cykgKyAnICcgKyByZWN0WzJdLnkgKyAnICc7XG4gICAgICAgICAgICBwYXRoICs9ICdMICcgKyAocmVjdFszXS54ICsgIHJhZGl1cykgKyAnICcgKyByZWN0WzNdLnkgKyAnICc7XG4gICAgICAgICAgICBwYXRoICs9ICdDICcgKyByZWN0WzNdLnggKyAnICcgKyByZWN0WzNdLnkgKyAnICcgKyByZWN0WzNdLnggKyAnICcgKyByZWN0WzNdLnkgKyAnICcgKyByZWN0WzNdLnggKyAnICcgKyAocmVjdFszXS55IC0gIHJhZGl1cykgKyAnICc7XG4gICAgICAgICAgICAvLyBwYXRoICs9ICdaJztcbiAgICAgICAgICAgIHBhdGggKz0gJ0wgJyArIHJlY3RbMF0ueCArICcgJyArIChyZWN0WzBdLnkgKyAgcmFkaXVzKSArICcgJztcblxuICAgICAgICAgICAgcmV0dXJuIHBhdGg7XG4gICAgICAgIH0sXG5cbiAgICAgICAgZ2V0Q2xpcFBhdGg6IGZ1bmN0aW9uKHJhZGl1cyA9IDI0LCBvZmZzZXQgPSB7eDogMCwgeTogMH0sIHJlbGF0aXZlID0gZmFsc2UsIGFic29sdXRlID0gZmFsc2UpIHtcbiAgICAgICAgICAvL00gMCA4IEMgMCAwIDAgMCA4IDAgTCAzOCAwIEMgNDYgMCA0NiAwIDQ2IDggQyA0NiAxNiA0NiAxNiAzOCAxNiBMIDggMTYgQyAwIDE2IDAgMTYgMCA4XG5cbiAgICAgICAgICAgIC8vIGxldCBlbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignaW5wdXQuZmktaW5wdXQnKTtcblxuICAgICAgICAgICAgbGV0IHBhdGggPSAnTSAwIDAgJztcbiAgICAgICAgICAgIHBhdGggKz0gJ0wgMCAnICsgd2luZG93LmlubmVySGVpZ2h0ICsgJyAnO1xuICAgICAgICAgICAgcGF0aCArPSAnTCAnICsgd2luZG93LmlubmVyV2lkdGggKyAnICcgKyB3aW5kb3cuaW5uZXJIZWlnaHQgKyAnICc7XG4gICAgICAgICAgICBwYXRoICs9ICdMICcgKyB3aW5kb3cuaW5uZXJXaWR0aCArICcgMCAnO1xuICAgICAgICAgICAgcGF0aCArPSAnTCAwIDAgJztcblxuICAgICAgICAgICAgcGF0aCArPSB0aGlzLmdldFdpbmRvd1BhdGgocmFkaXVzLCBvZmZzZXQsIHJlbGF0aXZlLCBhYnNvbHV0ZSk7XG5cbiAgICAgICAgICAgIHJldHVybiBwYXRoO1xuICAgICAgICB9LFxuXG4gICAgICAgIGdldENsaXBQYXRoT2xkOiBmdW5jdGlvbiAoZWxlbWVudCwgbWFyZ2luID0gMTApIHtcbiAgICAgICAgICAgIGxldCBwYXRoID0gJ3BvbHlnb24oMCUgMCUsMTAwJSAwJSwxMDAlIDEwMCUsMCUgMTAwJSwwJSAwJSwnO1xuXG4gICAgICAgICAgICBlbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignaW5wdXQuZmktaW5wdXQnKTtcbiAgICAgICAgICAgIC8vIGVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdkaXYuZmktZm8tZmllbGQtd3JwJyk7XG5cbiAgICAgICAgICAgIGNvbnN0IHJlY3QgPSB0aGlzLmdldFJlY3QoZWxlbWVudCk7XG4gICAgICAgICAgICBjb25zdCBhY3Rpb25SZWN0ID0gdGhpcy5nZXRSZWN0KFxuICAgICAgICAgICAgICAgIGVsZW1lbnQsXG4gICAgICAgICAgICAgICAgMTAsXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB4OiAwLFxuICAgICAgICAgICAgICAgICAgICB5OiBlbGVtZW50LmNsaWVudEhlaWdodCArIDEwXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgcGF0aCArPSByZWN0WzBdLnggKyAncHggJyArIHJlY3RbMF0ueSArICdweCwgJztcbiAgICAgICAgICAgIHBhdGggKz0gcmVjdFszXS54ICsgJ3B4ICcgKyByZWN0WzNdLnkgKyAncHgsICc7XG4gICAgICAgICAgICBwYXRoICs9IHJlY3RbMl0ueCArICdweCAnICsgcmVjdFsyXS55ICsgJ3B4LCAnO1xuICAgICAgICAgICAgcGF0aCArPSByZWN0WzFdLnggKyAncHggJyArIHJlY3RbMV0ueSArICdweCwgJztcbiAgICAgICAgICAgIHBhdGggKz0gcmVjdFswXS54ICsgJ3B4ICcgKyByZWN0WzBdLnkgKyAncHgnO1xuICAgICAgICAgICAgcGF0aCArPSAnKSc7XG5cbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGVsZW1lbnQub2Zmc2V0TGVmdCwgZWxlbWVudC5vZmZzZXRUb3AsIGVsZW1lbnQuY2xpZW50V2lkdGgsIGVsZW1lbnQuY2xpZW50SGVpZ2h0KTtcblxuICAgICAgICAgICAgY29uc29sZS5sb2coJ1tjbGlwLXBhdGg6JyArIHBhdGgpO1xuXG4gICAgICAgICAgICAvLyByZXR1cm4gJ1tjbGlwLXBhdGg6cG9seWdvbigwJV8wJSwxMDAlXzAlLDEwMCVfMTAwJSwwJV8xMDAlLDAlXzAlLDIwMHB4XzIwMHB4LDIwMHB4XzEwMHB4LDEwMHB4XzEwMHB4LDEwMHB4XzIwMHB4LDIwMHB4XzIwMHB4KV0nO1xuICAgICAgICAgICAgcmV0dXJuICdjbGlwLXBhdGg6ICcgKyBwYXRoO1xuICAgICAgICB9LFxuXG4gICAgICAgIGdldFJlY3Q6IGZ1bmN0aW9uIChlbGVtZW50LCBtYXJnaW4gPSAxMCwgb2Zmc2V0ID0ge3g6IDAsIHk6IDB9LCByZWxhdGl2ZSA9IGZhbHNlLCBwb3NpdGl2ZSA9IGZhbHNlKSB7XG4gICAgICAgICAgICBjb25zdCBsZWZ0ID0gcmVsYXRpdmUgPyAwIDogZWxlbWVudC5vZmZzZXRMZWZ0O1xuICAgICAgICAgICAgY29uc3QgdG9wID0gcmVsYXRpdmUgPyAwIDogZWxlbWVudC5vZmZzZXRUb3A7XG5cbiAgICAgICAgICAgIGxldCByZXN1bHQgPSBbXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB4OiBsZWZ0IC0gbWFyZ2luICsgb2Zmc2V0LngsXG4gICAgICAgICAgICAgICAgICAgIHk6IHRvcCAtIG1hcmdpbiArIG9mZnNldC55XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHg6bGVmdCArIGVsZW1lbnQuY2xpZW50V2lkdGggKyBtYXJnaW4gKyBvZmZzZXQueCxcbiAgICAgICAgICAgICAgICAgICAgeTogdG9wIC0gbWFyZ2luICsgb2Zmc2V0LnlcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgeDogbGVmdCArIGVsZW1lbnQuY2xpZW50V2lkdGggKyBtYXJnaW4gKyBvZmZzZXQueCxcbiAgICAgICAgICAgICAgICAgICAgeTogdG9wICsgZWxlbWVudC5jbGllbnRIZWlnaHQgKyBtYXJnaW4gKyBvZmZzZXQueVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB4OiBsZWZ0IC0gbWFyZ2luICsgb2Zmc2V0LngsXG4gICAgICAgICAgICAgICAgICAgIHk6IHRvcCArIGVsZW1lbnQuY2xpZW50SGVpZ2h0ICsgbWFyZ2luICsgb2Zmc2V0LnlcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICBdO1xuXG4gICAgICAgICAgICBpZiAocG9zaXRpdmUpIHtcbiAgICAgICAgICAgICAgICBsZXQgbWluWCA9IDA7XG4gICAgICAgICAgICAgICAgbGV0IG1pblkgPSAwO1xuXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCByZXN1bHQubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlc3VsdFtpXS54IDwgbWluWCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgbWluWCA9IHJlc3VsdFtpXS54O1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlc3VsdFtpXS55IDwgbWluWSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgbWluWSA9IHJlc3VsdFtpXS55O1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCByZXN1bHQubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0W2ldLnggLT0gbWluWDtcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0W2ldLnkgLT0gbWluWTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgIH1cbiAgICAgICAgLy8gWW91IGNhbiBkZWZpbmUgYW55IG90aGVyIEFscGluZS5qcyBmdW5jdGlvbnMgaGVyZS5cbiAgICB9XG59Il0sCiAgIm1hcHBpbmdzIjogIjtBQUVlLFNBQVIscUJBQXNDO0FBQ3pDLFNBQU87QUFBQTtBQUFBLElBR0gsTUFBTSxXQUFZO0FBQ2QsY0FBUSxJQUFJLGVBQWU7QUFDM0IsaUJBQVcsTUFBTTtBQUNiLGFBQUssSUFBSSxVQUFVLE9BQU8sUUFBUTtBQUNsQyxhQUFLLFdBQVc7QUFBQSxNQUNwQixHQUFHLEdBQUk7QUFBQSxJQUVYO0FBQUEsSUFFQSxZQUFZLFdBQVk7QUFDcEIsVUFBSSxVQUFVLFNBQVMsY0FBYyxxQkFBcUI7QUFDMUQsVUFBSSxTQUFTLFNBQVMsY0FBYyxlQUFlO0FBQ25ELFVBQUksTUFBTSxTQUFTLGNBQWMsWUFBWTtBQUM3QyxVQUFJLFVBQVUsU0FBUyxjQUFjLGdCQUFnQjtBQUNyRCxVQUFJLFNBQVMsU0FBUyxjQUFjLGVBQWU7QUFFbkQsWUFBTSxPQUFPLEtBQUssUUFBUSxTQUFTLEVBQUU7QUFFckMsYUFBTyxVQUFVLE9BQU8sUUFBUTtBQUVoQyxhQUFPLE1BQU0sV0FBVztBQUN4QixhQUFPLE1BQU0sT0FBUSxLQUFLLENBQUMsRUFBRSxJQUFJLE9BQU8sY0FBZTtBQUN2RCxhQUFPLE1BQU0sTUFBTyxLQUFLLENBQUMsRUFBRSxJQUFJLEtBQU07QUFDdEMsYUFBTyxNQUFNLFNBQVM7QUFZdEIsY0FBUSxNQUFNLFNBQVM7QUFFdkIsWUFBTSxrQkFBa0IsS0FBSyxLQUFLLE1BQU0sVUFBVTtBQUNsRCxjQUFRLElBQUksbUJBQW1CLGVBQWU7QUFFOUMsYUFBTyxNQUFNLFdBQVc7QUFDeEIsYUFBTyxNQUFNLE9BQU8sS0FBSyxDQUFDLEVB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
