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
      dialog.style.position = "absolute";
      dialog.style.left = rect[0].x + "px";
      dialog.style.top = rect[0].y + "px";
      dialog.style.width = rect[1].x - rect[0].x + "px";
      dialog.style.height = rect[2].y - rect[0].y + "px";
      svg.style.height = rect[2].y - rect[0].y + "px";
    },
    getWindowPath: function(radius = 24, relative = false, positive = false) {
      let element = document.querySelector("div.fi-fo-field-wrp");
      const rect = this.getRect(element, 10, { x: 0, y: 0 }, relative, positive);
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
    getClipPath: function(radius = 24) {
      let path = "M 0 0 ";
      path += "L 0 " + window.innerHeight + " ";
      path += "L " + window.innerWidth + " " + window.innerHeight + " ";
      path += "L " + window.innerWidth + " 0 ";
      path += "L 0 0 ";
      path += this.getWindowPath(radius);
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vY29tcG9uZW50cy90dXRvcmlhbHMuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIEltcG9ydCBhbnkgZXh0ZXJuYWwgSmF2YVNjcmlwdCBsaWJyYXJpZXMgZnJvbSBOUE0gaGVyZS5cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gdHV0b3JpYWxzQ29tcG9uZW50KCkge1xuICAgIHJldHVybiB7XG4gICAgICAgIC8vIFlvdSBjYW4gZGVmaW5lIGFueSBvdGhlciBBbHBpbmUuanMgcHJvcGVydGllcyBoZXJlLlxuXG4gICAgICAgIGluaXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdIZWxsbywgd29ybGQhJyk7XG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLiRlbC5jbGFzc0xpc3QucmVtb3ZlKCdoaWRkZW4nKTtcbiAgICAgICAgICAgICAgICB0aGlzLnNob3dBY3Rpb24oKTtcbiAgICAgICAgICAgIH0sIDIwMDApO1xuICAgICAgICAgICAgLy8gSW5pdGlhbGlzZSB0aGUgQWxwaW5lIGNvbXBvbmVudCBoZXJlLCBpZiB5b3UgbmVlZCB0by5cbiAgICAgICAgfSxcblxuICAgICAgICBzaG93QWN0aW9uOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBsZXQgZWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2Rpdi5maS1mby1maWVsZC13cnAnKTtcbiAgICAgICAgICAgIGxldCBhY3Rpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdbZGF0YS1hY3Rpb25dJyk7XG4gICAgICAgICAgICBsZXQgc3ZnID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignW2RhdGEtc3ZnXScpO1xuICAgICAgICAgICAgbGV0IHdyYXBwZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdbZGF0YS13cmFwcGVyXScpO1xuICAgICAgICAgICAgbGV0IGRpYWxvZyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLWRpYWxvZ10nKTtcblxuICAgICAgICAgICAgY29uc3QgcmVjdCA9IHRoaXMuZ2V0UmVjdChlbGVtZW50LCAxMCk7XG5cbiAgICAgICAgICAgIGFjdGlvbi5jbGFzc0xpc3QucmVtb3ZlKCdoaWRkZW4nKTtcblxuICAgICAgICAgICAgYWN0aW9uLnN0eWxlLnBvc2l0aW9uID0gJ2ZpeGVkJztcbiAgICAgICAgICAgIGFjdGlvbi5zdHlsZS5sZWZ0ID0gKHJlY3RbMl0ueCAtIGFjdGlvbi5jbGllbnRXaWR0aCkgKyAncHgnO1xuICAgICAgICAgICAgYWN0aW9uLnN0eWxlLnRvcCA9IChyZWN0WzNdLnkgKyAxMCkgKyAncHgnO1xuICAgICAgICAgICAgYWN0aW9uLnN0eWxlLnpJbmRleCA9IDEwMDA7XG5cbiAgICAgICAgICAgIC8vIHN2Zy5zdHlsZS5wb3NpdGlvbiA9ICdmaXhlZCc7XG4gICAgICAgICAgICAvLyBzdmcuc3R5bGUubGVmdCA9IHJlY3RbMF0ueCArICdweCc7XG4gICAgICAgICAgICAvLyBzdmcuc3R5bGUudG9wID0gcmVjdFswXS55ICsgJ3B4JztcbiAgICAgICAgICAgIC8vIHN2Zy5zdHlsZS56SW5kZXggPSAxMDAwO1xuXG4gICAgICAgICAgICAvLyB3cmFwcGVyLnN0eWxlLnBvc2l0aW9uID0gJ2ZpeGVkJztcbiAgICAgICAgICAgIC8vIHdyYXBwZXIuc3R5bGUubGVmdCA9IHJlY3RbMF0ueCArICdweCc7XG4gICAgICAgICAgICAvLyB3cmFwcGVyLnN0eWxlLnRvcCA9IChyZWN0WzBdLnkgLSA1MCkgKyAncHgnO1xuICAgICAgICAgICAgLy8gd3JhcHBlci5zdHlsZS53aWR0aCA9IChyZWN0WzFdLnggLSByZWN0WzBdLngpICsgJ3B4JztcbiAgICAgICAgICAgIC8vIHdyYXBwZXIuc3R5bGUuaGVpZ2h0ID0gKHJlY3RbMl0ueSAtIHJlY3RbMF0ueSArIDUwICsgNTApICsgJ3B4JztcbiAgICAgICAgICAgIHdyYXBwZXIuc3R5bGUuekluZGV4ID0gMTIwMDtcblxuICAgICAgICAgICAgZGlhbG9nLnN0eWxlLnBvc2l0aW9uID0gJ2Fic29sdXRlJztcbiAgICAgICAgICAgIGRpYWxvZy5zdHlsZS5sZWZ0ID0gcmVjdFswXS54ICsgJ3B4JztcbiAgICAgICAgICAgIGRpYWxvZy5zdHlsZS50b3AgPSAocmVjdFswXS55KSArICdweCc7XG4gICAgICAgICAgICBkaWFsb2cuc3R5bGUud2lkdGggPSAocmVjdFsxXS54IC0gcmVjdFswXS54KSArICdweCc7XG4gICAgICAgICAgICBkaWFsb2cuc3R5bGUuaGVpZ2h0ID0gKHJlY3RbMl0ueSAtIHJlY3RbMF0ueSkgKyAncHgnO1xuICAgICAgICAgICAgc3ZnLnN0eWxlLmhlaWdodCA9IChyZWN0WzJdLnkgLSByZWN0WzBdLnkpICsgJ3B4JztcblxuICAgICAgICB9LFxuXG4gICAgICAgIGdldFdpbmRvd1BhdGg6IGZ1bmN0aW9uKHJhZGl1cyA9IDI0LCByZWxhdGl2ZSA9IGZhbHNlLCBwb3NpdGl2ZSA9IGZhbHNlKSB7XG4gICAgICAgICAgICBsZXQgZWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2Rpdi5maS1mby1maWVsZC13cnAnKTtcblxuICAgICAgICAgICAgY29uc3QgcmVjdCA9IHRoaXMuZ2V0UmVjdChlbGVtZW50LCAxMCwge3g6MCx5OjB9LCByZWxhdGl2ZSwgcG9zaXRpdmUpO1xuXG4gICAgICAgICAgICBsZXQgcGF0aCA9ICcnO1xuICAgICAgICAgICAgcGF0aCArPSAnTSAnICsgcmVjdFswXS54ICsgJyAnICsgKHJlY3RbMF0ueSArICByYWRpdXMpICsgJyAnO1xuICAgICAgICAgICAgcGF0aCArPSAnQyAnICsgcmVjdFswXS54ICsgJyAnICsgcmVjdFswXS55ICsgJyAnICsgcmVjdFswXS54ICsgJyAnICsgcmVjdFswXS55ICsgJyAnICsgKHJlY3RbMF0ueCArICByYWRpdXMpICsgJyAnICsgcmVjdFswXS55ICsgJyAnO1xuICAgICAgICAgICAgcGF0aCArPSAnTCAnICsgKHJlY3RbMV0ueCAtICByYWRpdXMpICsgJyAnICsgcmVjdFsxXS55ICsgJyAnO1xuICAgICAgICAgICAgcGF0aCArPSAnQyAnICsgcmVjdFsxXS54ICsgJyAnICsgcmVjdFsxXS55ICsgJyAnICsgcmVjdFsxXS54ICsgJyAnICsgcmVjdFsxXS55ICsgJyAnICsgcmVjdFsxXS54ICsgJyAnICsgKHJlY3RbMV0ueSArICByYWRpdXMpICsgJyAnO1xuICAgICAgICAgICAgcGF0aCArPSAnTCAnICsgcmVjdFsyXS54ICsgJyAnICsgKHJlY3RbMl0ueSAtICByYWRpdXMpICsgJyAnO1xuICAgICAgICAgICAgcGF0aCArPSAnQyAnICsgcmVjdFsyXS54ICsgJyAnICsgcmVjdFsyXS55ICsgJyAnICsgcmVjdFsyXS54ICsgJyAnICsgcmVjdFsyXS55ICsgJyAnICsgKHJlY3RbMl0ueCAtICByYWRpdXMpICsgJyAnICsgcmVjdFsyXS55ICsgJyAnO1xuICAgICAgICAgICAgcGF0aCArPSAnTCAnICsgKHJlY3RbM10ueCArICByYWRpdXMpICsgJyAnICsgcmVjdFszXS55ICsgJyAnO1xuICAgICAgICAgICAgcGF0aCArPSAnQyAnICsgcmVjdFszXS54ICsgJyAnICsgcmVjdFszXS55ICsgJyAnICsgcmVjdFszXS54ICsgJyAnICsgcmVjdFszXS55ICsgJyAnICsgcmVjdFszXS54ICsgJyAnICsgKHJlY3RbM10ueSAtICByYWRpdXMpICsgJyAnO1xuICAgICAgICAgICAgLy8gcGF0aCArPSAnWic7XG4gICAgICAgICAgICBwYXRoICs9ICdMICcgKyByZWN0WzBdLnggKyAnICcgKyAocmVjdFswXS55ICsgIHJhZGl1cykgKyAnICc7XG5cbiAgICAgICAgICAgIHJldHVybiBwYXRoO1xuICAgICAgICB9LFxuXG4gICAgICAgIGdldENsaXBQYXRoOiBmdW5jdGlvbihyYWRpdXMgPSAyNCkge1xuICAgICAgICAgIC8vTSAwIDggQyAwIDAgMCAwIDggMCBMIDM4IDAgQyA0NiAwIDQ2IDAgNDYgOCBDIDQ2IDE2IDQ2IDE2IDM4IDE2IEwgOCAxNiBDIDAgMTYgMCAxNiAwIDhcblxuICAgICAgICAgICAgLy8gbGV0IGVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdpbnB1dC5maS1pbnB1dCcpO1xuXG4gICAgICAgICAgICBsZXQgcGF0aCA9ICdNIDAgMCAnO1xuICAgICAgICAgICAgcGF0aCArPSAnTCAwICcgKyB3aW5kb3cuaW5uZXJIZWlnaHQgKyAnICc7XG4gICAgICAgICAgICBwYXRoICs9ICdMICcgKyB3aW5kb3cuaW5uZXJXaWR0aCArICcgJyArIHdpbmRvdy5pbm5lckhlaWdodCArICcgJztcbiAgICAgICAgICAgIHBhdGggKz0gJ0wgJyArIHdpbmRvdy5pbm5lcldpZHRoICsgJyAwICc7XG4gICAgICAgICAgICBwYXRoICs9ICdMIDAgMCAnO1xuXG4gICAgICAgICAgICBwYXRoICs9IHRoaXMuZ2V0V2luZG93UGF0aChyYWRpdXMpO1xuXG4gICAgICAgICAgICByZXR1cm4gcGF0aDtcbiAgICAgICAgfSxcblxuICAgICAgICBnZXRDbGlwUGF0aE9sZDogZnVuY3Rpb24gKGVsZW1lbnQsIG1hcmdpbiA9IDEwKSB7XG4gICAgICAgICAgICBsZXQgcGF0aCA9ICdwb2x5Z29uKDAlIDAlLDEwMCUgMCUsMTAwJSAxMDAlLDAlIDEwMCUsMCUgMCUsJztcblxuICAgICAgICAgICAgZWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2lucHV0LmZpLWlucHV0Jyk7XG4gICAgICAgICAgICAvLyBlbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignZGl2LmZpLWZvLWZpZWxkLXdycCcpO1xuXG4gICAgICAgICAgICBjb25zdCByZWN0ID0gdGhpcy5nZXRSZWN0KGVsZW1lbnQpO1xuICAgICAgICAgICAgY29uc3QgYWN0aW9uUmVjdCA9IHRoaXMuZ2V0UmVjdChcbiAgICAgICAgICAgICAgICBlbGVtZW50LFxuICAgICAgICAgICAgICAgIDEwLFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgeDogMCxcbiAgICAgICAgICAgICAgICAgICAgeTogZWxlbWVudC5jbGllbnRIZWlnaHQgKyAxMFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICk7XG5cbiAgICAgICAgICAgIHBhdGggKz0gcmVjdFswXS54ICsgJ3B4ICcgKyByZWN0WzBdLnkgKyAncHgsICc7XG4gICAgICAgICAgICBwYXRoICs9IHJlY3RbM10ueCArICdweCAnICsgcmVjdFszXS55ICsgJ3B4LCAnO1xuICAgICAgICAgICAgcGF0aCArPSByZWN0WzJdLnggKyAncHggJyArIHJlY3RbMl0ueSArICdweCwgJztcbiAgICAgICAgICAgIHBhdGggKz0gcmVjdFsxXS54ICsgJ3B4ICcgKyByZWN0WzFdLnkgKyAncHgsICc7XG4gICAgICAgICAgICBwYXRoICs9IHJlY3RbMF0ueCArICdweCAnICsgcmVjdFswXS55ICsgJ3B4JztcbiAgICAgICAgICAgIHBhdGggKz0gJyknO1xuXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhlbGVtZW50Lm9mZnNldExlZnQsIGVsZW1lbnQub2Zmc2V0VG9wLCBlbGVtZW50LmNsaWVudFdpZHRoLCBlbGVtZW50LmNsaWVudEhlaWdodCk7XG5cbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdbY2xpcC1wYXRoOicgKyBwYXRoKTtcblxuICAgICAgICAgICAgLy8gcmV0dXJuICdbY2xpcC1wYXRoOnBvbHlnb24oMCVfMCUsMTAwJV8wJSwxMDAlXzEwMCUsMCVfMTAwJSwwJV8wJSwyMDBweF8yMDBweCwyMDBweF8xMDBweCwxMDBweF8xMDBweCwxMDBweF8yMDBweCwyMDBweF8yMDBweCldJztcbiAgICAgICAgICAgIHJldHVybiAnY2xpcC1wYXRoOiAnICsgcGF0aDtcbiAgICAgICAgfSxcblxuICAgICAgICBnZXRSZWN0OiBmdW5jdGlvbiAoZWxlbWVudCwgbWFyZ2luID0gMTAsIG9mZnNldCA9IHt4OiAwLCB5OiAwfSwgcmVsYXRpdmUgPSBmYWxzZSwgcG9zaXRpdmUgPSBmYWxzZSkge1xuICAgICAgICAgICAgY29uc3QgbGVmdCA9IHJlbGF0aXZlID8gMCA6IGVsZW1lbnQub2Zmc2V0TGVmdDtcbiAgICAgICAgICAgIGNvbnN0IHRvcCA9IHJlbGF0aXZlID8gMCA6IGVsZW1lbnQub2Zmc2V0VG9wO1xuXG4gICAgICAgICAgICBsZXQgcmVzdWx0ID0gW1xuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgeDogbGVmdCAtIG1hcmdpbiArIG9mZnNldC54LFxuICAgICAgICAgICAgICAgICAgICB5OiB0b3AgLSBtYXJnaW4gKyBvZmZzZXQueVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB4OmxlZnQgKyBlbGVtZW50LmNsaWVudFdpZHRoICsgbWFyZ2luICsgb2Zmc2V0LngsXG4gICAgICAgICAgICAgICAgICAgIHk6IHRvcCAtIG1hcmdpbiArIG9mZnNldC55XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHg6IGxlZnQgKyBlbGVtZW50LmNsaWVudFdpZHRoICsgbWFyZ2luICsgb2Zmc2V0LngsXG4gICAgICAgICAgICAgICAgICAgIHk6IHRvcCArIGVsZW1lbnQuY2xpZW50SGVpZ2h0ICsgbWFyZ2luICsgb2Zmc2V0LnlcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgeDogbGVmdCAtIG1hcmdpbiArIG9mZnNldC54LFxuICAgICAgICAgICAgICAgICAgICB5OiB0b3AgKyBlbGVtZW50LmNsaWVudEhlaWdodCArIG1hcmdpbiArIG9mZnNldC55XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgXTtcblxuICAgICAgICAgICAgaWYgKHBvc2l0aXZlKSB7XG4gICAgICAgICAgICAgICAgbGV0IG1pblggPSAwO1xuICAgICAgICAgICAgICAgIGxldCBtaW5ZID0gMDtcblxuICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcmVzdWx0Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChyZXN1bHRbaV0ueCA8IG1pblgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG1pblggPSByZXN1bHRbaV0ueDtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIGlmIChyZXN1bHRbaV0ueSA8IG1pblkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG1pblkgPSByZXN1bHRbaV0ueTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcmVzdWx0Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdFtpXS54IC09IG1pblg7XG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdFtpXS55IC09IG1pblk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICB9XG4gICAgICAgIC8vIFlvdSBjYW4gZGVmaW5lIGFueSBvdGhlciBBbHBpbmUuanMgZnVuY3Rpb25zIGhlcmUuXG4gICAgfVxufSJdLAogICJtYXBwaW5ncyI6ICI7QUFFZSxTQUFSLHFCQUFzQztBQUN6QyxTQUFPO0FBQUE7QUFBQSxJQUdILE1BQU0sV0FBWTtBQUNkLGNBQVEsSUFBSSxlQUFlO0FBQzNCLGlCQUFXLE1BQU07QUFDYixhQUFLLElBQUksVUFBVSxPQUFPLFFBQVE7QUFDbEMsYUFBSyxXQUFXO0FBQUEsTUFDcEIsR0FBRyxHQUFJO0FBQUEsSUFFWDtBQUFBLElBRUEsWUFBWSxXQUFZO0FBQ3BCLFVBQUksVUFBVSxTQUFTLGNBQWMscUJBQXFCO0FBQzFELFVBQUksU0FBUyxTQUFTLGNBQWMsZUFBZTtBQUNu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
