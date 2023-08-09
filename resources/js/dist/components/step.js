// resources/js/components/step.js
function stepComponent({
  key
}) {
  return {
    targetElement: null,
    // You can define any other Alpine.js properties here.
    init: function() {
      this.targetElement = this.findElement(key);
    },
    // You can define any other Alpine.js functions here.
    initializeDialog: function(dialog) {
      const rect = this.elementRect();
      const header = dialog.querySelector("[data-dialog-header]");
      const stroke = dialog.querySelector("[data-dialog-stroke]");
      const width = rect[1].x - rect[0].x;
      const height = rect[2].y - rect[0].y;
      var y1 = header.getBoundingClientRect().top;
      var y2 = stroke.getBoundingClientRect().top;
      var distance = y2 - y1;
      const x = rect[0].x;
      const y = rect[0].y - distance;
      dialog.style.width = `${width}px`;
      dialog.style.transform = `translate(${x}px, ${y}px)`;
      stroke.style.height = `${height}px`;
    },
    clipPath: function(element = null, options = {}) {
      element = element || this.targetElement;
      options = {
        radius: 24,
        margin: 10,
        offset: { x: 0, y: 0 },
        relative: false,
        ...options
      };
      return `${this.windowPath()} ${this.elementPath(element, options)}`.trim();
    },
    windowPath: function() {
      let path = "M 0 0 ";
      path += "L 0 " + window.innerHeight + " ";
      path += "L " + window.innerWidth + " " + window.innerHeight + " ";
      path += "L " + window.innerWidth + " 0 ";
      path += "L 0 0 ";
      return path.trim();
    },
    findElement: function(name) {
      return document.getElementById(`data.${name}`);
    },
    elementPath: function(element = null, options = {}) {
      element = element || this.targetElement;
      options = {
        radius: 24,
        margin: 10,
        offset: { x: 0, y: 0 },
        ...options
      };
      const rect = this.elementRect(element, {
        relative: false,
        ...options
      });
      let path = "";
      path += "M " + rect[0].x + " " + (rect[0].y + options.radius) + " ";
      path += "C " + rect[0].x + " " + rect[0].y + " " + rect[0].x + " " + rect[0].y + " " + (rect[0].x + options.radius) + " " + rect[0].y + " ";
      path += "L " + (rect[1].x - options.radius) + " " + rect[1].y + " ";
      path += "C " + rect[1].x + " " + rect[1].y + " " + rect[1].x + " " + rect[1].y + " " + rect[1].x + " " + (rect[1].y + options.radius) + " ";
      path += "L " + rect[2].x + " " + (rect[2].y - options.radius) + " ";
      path += "C " + rect[2].x + " " + rect[2].y + " " + rect[2].x + " " + rect[2].y + " " + (rect[2].x - options.radius) + " " + rect[2].y + " ";
      path += "L " + (rect[3].x + options.radius) + " " + rect[3].y + " ";
      path += "C " + rect[3].x + " " + rect[3].y + " " + rect[3].x + " " + rect[3].y + " " + rect[3].x + " " + (rect[3].y - options.radius) + " ";
      path += "L " + rect[0].x + " " + (rect[0].y + options.radius) + " ";
      return path.trim();
    },
    elementRect: function(element = null, options = {}) {
      element = element || this.targetElement;
      options = {
        radius: 24,
        margin: 10,
        offset: { x: 0, y: 0 },
        relative: false,
        ...options
      };
      const left = options.relative ? 0 : element.offsetLeft;
      const top = options.relative ? 0 : element.offsetTop;
      let result = [
        {
          x: left - options.margin + options.offset.x,
          y: top - options.margin + options.offset.y
        },
        {
          x: left + element.clientWidth + options.margin + options.offset.x,
          y: top - options.margin + options.offset.y
        },
        {
          x: left + element.clientWidth + options.margin + options.offset.x,
          y: top + element.clientHeight + options.margin + options.offset.y
        },
        {
          x: left - options.margin + options.offset.x,
          y: top + element.clientHeight + options.margin + options.offset.y
        }
      ];
      if (options.positive) {
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
  };
}
export {
  stepComponent as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vY29tcG9uZW50cy9zdGVwLmpzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBJbXBvcnQgYW55IGV4dGVybmFsIEphdmFTY3JpcHQgbGlicmFyaWVzIGZyb20gTlBNIGhlcmUuXG4vLyBpbXBvcnQgTW91c2V0cmFwIGZyb20gJ21vdXNldHJhcCc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHN0ZXBDb21wb25lbnQoe1xuICAgIGtleSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSkge1xuICAgIHJldHVybiB7XG4gICAgICAgIHRhcmdldEVsZW1lbnQ6IG51bGwsXG4gICAgICAgIC8vIFlvdSBjYW4gZGVmaW5lIGFueSBvdGhlciBBbHBpbmUuanMgcHJvcGVydGllcyBoZXJlLlxuXG4gICAgICAgIGluaXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHRoaXMudGFyZ2V0RWxlbWVudCA9IHRoaXMuZmluZEVsZW1lbnQoa2V5KTtcbiAgICAgICAgfSxcbiAgICAgICAgLy8gWW91IGNhbiBkZWZpbmUgYW55IG90aGVyIEFscGluZS5qcyBmdW5jdGlvbnMgaGVyZS5cblxuICAgICAgICBpbml0aWFsaXplRGlhbG9nOiBmdW5jdGlvbiAoZGlhbG9nKSB7XG4gICAgICAgICAgICBjb25zdCByZWN0ID0gdGhpcy5lbGVtZW50UmVjdCgpO1xuICAgICAgICAgICAgY29uc3QgaGVhZGVyID0gZGlhbG9nLnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLWRpYWxvZy1oZWFkZXJdJyk7XG4gICAgICAgICAgICBjb25zdCBzdHJva2UgPSBkaWFsb2cucXVlcnlTZWxlY3RvcignW2RhdGEtZGlhbG9nLXN0cm9rZV0nKTtcblxuICAgICAgICAgICAgY29uc3Qgd2lkdGggPSByZWN0WzFdLnggLSByZWN0WzBdLng7XG4gICAgICAgICAgICBjb25zdCBoZWlnaHQgPSByZWN0WzJdLnkgLSByZWN0WzBdLnk7XG4gICAgICAgICAgICB2YXIgeTEgPSBoZWFkZXIuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkudG9wO1xuICAgICAgICAgICAgdmFyIHkyID0gc3Ryb2tlLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLnRvcDtcblxuICAgICAgICAgICAgdmFyIGRpc3RhbmNlID0geTIgLSB5MTtcblxuICAgICAgICAgICAgY29uc3QgeCA9IHJlY3RbMF0ueDtcbiAgICAgICAgICAgIGNvbnN0IHkgPSByZWN0WzBdLnkgLSBkaXN0YW5jZTtcbiAgICAgICAgICAgIGRpYWxvZy5zdHlsZS53aWR0aCA9IGAke3dpZHRofXB4YDtcbiAgICAgICAgICAgIGRpYWxvZy5zdHlsZS50cmFuc2Zvcm0gPSBgdHJhbnNsYXRlKCR7eH1weCwgJHt5fXB4KWA7XG4gICAgICAgICAgICBzdHJva2Uuc3R5bGUuaGVpZ2h0ID0gYCR7aGVpZ2h0fXB4YDtcbiAgICAgICAgfSxcblxuICAgICAgICBjbGlwUGF0aDogZnVuY3Rpb24oZWxlbWVudCA9IG51bGwsIG9wdGlvbnMgPSB7fSkge1xuICAgICAgICAgICAgZWxlbWVudCA9IGVsZW1lbnQgfHwgdGhpcy50YXJnZXRFbGVtZW50O1xuICAgICAgICAgICAgb3B0aW9ucyA9IHtcbiAgICAgICAgICAgICAgICByYWRpdXM6IDI0LFxuICAgICAgICAgICAgICAgIG1hcmdpbjogMTAsXG4gICAgICAgICAgICAgICAgb2Zmc2V0OiB7eDogMCwgeTogMH0sXG4gICAgICAgICAgICAgICAgcmVsYXRpdmU6IGZhbHNlLFxuICAgICAgICAgICAgICAgIC4uLm9wdGlvbnNcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBgJHt0aGlzLndpbmRvd1BhdGgoKX0gJHt0aGlzLmVsZW1lbnRQYXRoKGVsZW1lbnQsIG9wdGlvbnMpfWAudHJpbSgpO1xuICAgICAgICB9LFxuXG4gICAgICAgIHdpbmRvd1BhdGg6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIC8vIFRPRE86IGFkZCBvcHRpb24gdG8gc2VsZWN0IGNsb2Nrd2lzZSAvY291bnRlciBjbG9ja3dpc2VcbiAgICAgICAgICAgIC8vTSAwIDggQyAwIDAgMCAwIDggMCBMIDM4IDAgQyA0NiAwIDQ2IDAgNDYgOCBDIDQ2IDE2IDQ2IDE2IDM4IDE2IEwgOCAxNiBDIDAgMTYgMCAxNiAwIDhcbiAgICAgICAgICAgIGxldCBwYXRoID0gJ00gMCAwICc7XG4gICAgICAgICAgICBwYXRoICs9ICdMIDAgJyArIHdpbmRvdy5pbm5lckhlaWdodCArICcgJztcbiAgICAgICAgICAgIHBhdGggKz0gJ0wgJyArIHdpbmRvdy5pbm5lcldpZHRoICsgJyAnICsgd2luZG93LmlubmVySGVpZ2h0ICsgJyAnO1xuICAgICAgICAgICAgcGF0aCArPSAnTCAnICsgd2luZG93LmlubmVyV2lkdGggKyAnIDAgJztcbiAgICAgICAgICAgIHBhdGggKz0gJ0wgMCAwICc7XG5cbiAgICAgICAgICAgIHJldHVybiBwYXRoLnRyaW0oKTtcbiAgICAgICAgfSxcblxuICAgICAgICBmaW5kRWxlbWVudDogZnVuY3Rpb24obmFtZSkge1xuICAgICAgICAgIHJldHVybiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChgZGF0YS4ke25hbWV9YCk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgZWxlbWVudFBhdGg6IGZ1bmN0aW9uIChlbGVtZW50ID0gbnVsbCwgb3B0aW9ucyA9IHt9KSB7XG4gICAgICAgICAgICBlbGVtZW50ID0gZWxlbWVudCB8fCB0aGlzLnRhcmdldEVsZW1lbnQ7XG4gICAgICAgICAgICBvcHRpb25zID0ge1xuICAgICAgICAgICAgICAgIHJhZGl1czogMjQsXG4gICAgICAgICAgICAgICAgbWFyZ2luOiAxMCxcbiAgICAgICAgICAgICAgICBvZmZzZXQ6IHt4OiAwLCB5OiAwfSxcbiAgICAgICAgICAgICAgICAuLi5vcHRpb25zXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zdCByZWN0ID0gdGhpcy5lbGVtZW50UmVjdChlbGVtZW50LCB7XG4gICAgICAgICAgICAgICAgcmVsYXRpdmU6IGZhbHNlLFxuICAgICAgICAgICAgICAgIC4uLm9wdGlvbnMsXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgbGV0IHBhdGggPSAnJztcbiAgICAgICAgICAgIHBhdGggKz0gJ00gJyArIHJlY3RbMF0ueCArICcgJyArIChyZWN0WzBdLnkgKyAgb3B0aW9ucy5yYWRpdXMpICsgJyAnO1xuICAgICAgICAgICAgcGF0aCArPSAnQyAnICsgcmVjdFswXS54ICsgJyAnICsgcmVjdFswXS55ICsgJyAnICsgcmVjdFswXS54ICsgJyAnICsgcmVjdFswXS55ICsgJyAnICsgKHJlY3RbMF0ueCArICBvcHRpb25zLnJhZGl1cykgKyAnICcgKyByZWN0WzBdLnkgKyAnICc7XG4gICAgICAgICAgICBwYXRoICs9ICdMICcgKyAocmVjdFsxXS54IC0gIG9wdGlvbnMucmFkaXVzKSArICcgJyArIHJlY3RbMV0ueSArICcgJztcbiAgICAgICAgICAgIHBhdGggKz0gJ0MgJyArIHJlY3RbMV0ueCArICcgJyArIHJlY3RbMV0ueSArICcgJyArIHJlY3RbMV0ueCArICcgJyArIHJlY3RbMV0ueSArICcgJyArIHJlY3RbMV0ueCArICcgJyArIChyZWN0WzFdLnkgKyAgb3B0aW9ucy5yYWRpdXMpICsgJyAnO1xuICAgICAgICAgICAgcGF0aCArPSAnTCAnICsgcmVjdFsyXS54ICsgJyAnICsgKHJlY3RbMl0ueSAtICBvcHRpb25zLnJhZGl1cykgKyAnICc7XG4gICAgICAgICAgICBwYXRoICs9ICdDICcgKyByZWN0WzJdLnggKyAnICcgKyByZWN0WzJdLnkgKyAnICcgKyByZWN0WzJdLnggKyAnICcgKyByZWN0WzJdLnkgKyAnICcgKyAocmVjdFsyXS54IC0gIG9wdGlvbnMucmFkaXVzKSArICcgJyArIHJlY3RbMl0ueSArICcgJztcbiAgICAgICAgICAgIHBhdGggKz0gJ0wgJyArIChyZWN0WzNdLnggKyAgb3B0aW9ucy5yYWRpdXMpICsgJyAnICsgcmVjdFszXS55ICsgJyAnO1xuICAgICAgICAgICAgcGF0aCArPSAnQyAnICsgcmVjdFszXS54ICsgJyAnICsgcmVjdFszXS55ICsgJyAnICsgcmVjdFszXS54ICsgJyAnICsgcmVjdFszXS55ICsgJyAnICsgcmVjdFszXS54ICsgJyAnICsgKHJlY3RbM10ueSAtICBvcHRpb25zLnJhZGl1cykgKyAnICc7XG4gICAgICAgICAgICAvLyBwYXRoICs9ICdaJztcbiAgICAgICAgICAgIHBhdGggKz0gJ0wgJyArIHJlY3RbMF0ueCArICcgJyArIChyZWN0WzBdLnkgKyAgb3B0aW9ucy5yYWRpdXMpICsgJyAnO1xuXG4gICAgICAgICAgICByZXR1cm4gcGF0aC50cmltKCk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgZWxlbWVudFJlY3Q6IGZ1bmN0aW9uIChlbGVtZW50ID0gbnVsbCwgb3B0aW9ucyA9IHt9KSB7XG4gICAgICAgICAgICBlbGVtZW50ID0gZWxlbWVudCB8fCB0aGlzLnRhcmdldEVsZW1lbnQ7XG4gICAgICAgICAgICBvcHRpb25zID0ge1xuICAgICAgICAgICAgICAgIHJhZGl1czogMjQsXG4gICAgICAgICAgICAgICAgbWFyZ2luOiAxMCxcbiAgICAgICAgICAgICAgICBvZmZzZXQ6IHt4OiAwLCB5OiAwfSxcbiAgICAgICAgICAgICAgICByZWxhdGl2ZTogZmFsc2UsXG4gICAgICAgICAgICAgICAgLi4ub3B0aW9uc1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc3QgbGVmdCA9IG9wdGlvbnMucmVsYXRpdmUgPyAwIDogZWxlbWVudC5vZmZzZXRMZWZ0O1xuICAgICAgICAgICAgY29uc3QgdG9wID0gb3B0aW9ucy5yZWxhdGl2ZSA/IDAgOiBlbGVtZW50Lm9mZnNldFRvcDtcblxuICAgICAgICAgICAgbGV0IHJlc3VsdCA9IFtcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHg6IGxlZnQgLSBvcHRpb25zLm1hcmdpbiArIG9wdGlvbnMub2Zmc2V0LngsXG4gICAgICAgICAgICAgICAgICAgIHk6IHRvcCAtIG9wdGlvbnMubWFyZ2luICsgb3B0aW9ucy5vZmZzZXQueVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB4OiBsZWZ0ICsgZWxlbWVudC5jbGllbnRXaWR0aCArIG9wdGlvbnMubWFyZ2luICsgb3B0aW9ucy5vZmZzZXQueCxcbiAgICAgICAgICAgICAgICAgICAgeTogdG9wIC0gb3B0aW9ucy5tYXJnaW4gKyBvcHRpb25zLm9mZnNldC55XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHg6IGxlZnQgKyBlbGVtZW50LmNsaWVudFdpZHRoICsgb3B0aW9ucy5tYXJnaW4gKyBvcHRpb25zLm9mZnNldC54LFxuICAgICAgICAgICAgICAgICAgICB5OiB0b3AgKyBlbGVtZW50LmNsaWVudEhlaWdodCArIG9wdGlvbnMubWFyZ2luICsgb3B0aW9ucy5vZmZzZXQueVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB4OiBsZWZ0IC0gb3B0aW9ucy5tYXJnaW4gKyBvcHRpb25zLm9mZnNldC54LFxuICAgICAgICAgICAgICAgICAgICB5OiB0b3AgKyBlbGVtZW50LmNsaWVudEhlaWdodCArIG9wdGlvbnMubWFyZ2luICsgb3B0aW9ucy5vZmZzZXQueVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIF07XG5cbiAgICAgICAgICAgIGlmIChvcHRpb25zLnBvc2l0aXZlKSB7XG4gICAgICAgICAgICAgICAgbGV0IG1pblggPSAwO1xuICAgICAgICAgICAgICAgIGxldCBtaW5ZID0gMDtcblxuICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcmVzdWx0Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChyZXN1bHRbaV0ueCA8IG1pblgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG1pblggPSByZXN1bHRbaV0ueDtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIGlmIChyZXN1bHRbaV0ueSA8IG1pblkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG1pblkgPSByZXN1bHRbaV0ueTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcmVzdWx0Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdFtpXS54IC09IG1pblg7XG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdFtpXS55IC09IG1pblk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICB9XG4gICAgfVxufSJdLAogICJtYXBwaW5ncyI6ICI7QUFHZSxTQUFSLGNBQStCO0FBQUEsRUFDbEM7QUFDa0MsR0FBRztBQUNyQyxTQUFPO0FBQUEsSUFDSCxlQUFlO0FBQUE7QUFBQSxJQUdmLE1BQU0sV0FBWTtBQUNkLFdBQUssZ0JBQWdCLEtBQUssWUFBWSxHQUFHO0FBQUEsSUFDN0M7QUFBQTtBQUFBLElBR0Esa0JBQWtCLFNBQVUsUUFBUTtBQUNoQyxZQUFNLE9BQU8sS0FBSyxZQUFZO0FBQzlCLFlBQU0sU0FBUyxPQUFPLGNBQWMsc0JBQXNCO0FBQzFELFlBQU0sU0FBUyxPQUFPLGNBQWMsc0JBQXNCO0FBRTFELFlBQU0sUUFBUSxLQUFLLENBQUMsRUFBRSxJQUFJLEtBQUssQ0FBQyxFQUFFO0FBQ2xDLFlBQU0sU0FBUyxLQUFLLENBQUMsRUFBRSxJQUFJLEtBQUssQ0FBQyxFQUFFO0FBQ25DLFVBQUksS0FBSyxPQUFPLHNCQUFzQixFQUFFO0FBQ3hDLFVBQUksS0FBSyxPQUFPLHNCQUFzQixFQUFFO0FBRXhDLFVBQUksV0FBVyxLQUFLO0FBRXBCLFlBQU0sSUFBSSxL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
