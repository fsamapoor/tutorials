// resources/js/components/step.js
function stepComponent({
  key,
  selector,
  requiresAction
}) {
  return {
    target: null,
    initialize: function() {
      this.target = this.findElement(key);
      this.configure();
      console.log("initialize");
      console.log("this.$el", this.$el);
      const dialog = this.$root.querySelector("[data-dialog]");
      console.log("dialogos", dialog);
      const clipPath = this.$root.querySelector("[data-clip-path]");
      console.log("clipPath", clipPath);
      console.log("requiresAction", requiresAction);
      if (requiresAction) {
        this.target.addEventListener("click", (event) => {
          event.preventDefault();
          console.log("$wire", this.$wire.nextTutorialStep());
          this.target.blur();
          const descendants = this.target.querySelectorAll(":hover");
          for (let i = 0; i < descendants.length; i++) {
            const descendant = descendants[i];
            descendant.blur();
          }
        });
      }
      this.initializeDialog();
      this.$nextTick(() => {
        clipPath.setAttribute("d", this.clipPath());
        this.$dispatch("tutorial::render");
      });
      clipPath.setAttribute("d", this.clipPath());
    },
    timeouts: [],
    configure: function() {
      console.log("configure");
      console.log(this.target.tagName);
      if (this.target instanceof HTMLSelectElement) {
        if (this.target.hasAttribute("data-choice")) {
          this.target = this.target.parentElement.parentElement;
          const dropdown = this.target.querySelector(".choices__list.choices__list--dropdown");
          dropdown.style.zIndex = 100;
        }
      }
      if (this.target.tagName === "TRIX-EDITOR") {
        this.timeouts["trix"] = this.target.clientHeight;
        this.target = this.target.parentElement;
        console.log("is trix");
        const observer = new MutationObserver((mutationsList, observer2) => {
          console.log("resized");
          mutationsList.forEach((mutation) => {
            console.log("mutation", mutation);
            if (this.timeouts["trix"]) {
              clearTimeout(this.timeouts["trix"]);
            }
            this.timeouts["trix"] = setTimeout(() => {
              this.timeouts["trix"] = null;
              this.initialize();
            }, 500);
          });
        });
        const config = {
          attributes: true,
          attributeFilter: ["height"],
          childList: true,
          subtree: true
        };
        observer.observe(this.target, config);
      }
      if (this.target instanceof HTMLTextAreaElement || this.t) {
        console.log("is textarea");
        let initialWidth = this.target.offsetWidth;
        let initialHeight = this.target.offsetHeight;
        const observer = new MutationObserver(() => {
          if (this.target.offsetWidth !== initialWidth || this.target.offsetHeight !== initialHeight) {
            console.log("Textarea was resized.");
            initialWidth = this.target.offsetWidth;
            initialHeight = this.target.offsetHeight;
            if (this.timeouts["textarea"]) {
              clearTimeout(this.timeouts["textarea"]);
            }
            this.timeouts["textarea"] = setTimeout(() => {
              this.timeouts["textarea"] = null;
              this.initialize();
            }, 100);
          }
        });
        observer.observe(this.target, { attributes: true, attributeFilter: ["style"] });
      }
    },
    // You can define any other Alpine.js functions here.
    initializeDialog: function(dialog = null) {
      if (!dialog) {
        dialog = this.$root.querySelector("[data-dialog]");
      }
      const dialogPath = dialog.querySelector("[data-dialog-path]");
      console.log("initializeDialog");
      const rect = this.elementRect();
      const stroke = dialog.querySelector("[data-dialog-stroke]");
      window.scrollTo({
        top: rect[0].y - window.innerHeight / 3,
        left: rect[0].x,
        behavior: "smooth"
      });
      const width = rect[1].x - rect[0].x;
      const height = rect[2].y - rect[0].y;
      console.log("IMPORTANT HERE");
      console.log("width", width);
      console.log("height", height);
      console.log("rect", rect);
      const x = rect[0].x;
      const y = rect[0].y;
      console.log("x", x);
      console.log("y", y);
      console.log("dialog", dialog);
      dialog.style.width = `${width}px`;
      dialog.style.transform = `translate(${x}px, ${y}px)`;
      stroke.style.height = `${height}px`;
      dialogPath.setAttribute("d", this.elementPath(null, { relative: true, positive: true }));
    },
    clipPath: function(element = null, options = {}) {
      element = element || this.target;
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
      const documentHeight = Math.max(
        document.documentElement.clientHeight,
        document.documentElement.scrollHeight,
        document.documentElement.offsetHeight
      );
      let path = "M 0 0 ";
      path += "L 0 " + documentHeight + " ";
      path += "L " + window.innerWidth + " " + documentHeight + " ";
      path += "L " + window.innerWidth + " 0 ";
      path += "L 0 0 ";
      return path.trim();
    },
    findElement: function(name) {
      return document.querySelector(selector.replace(/\./g, "\\$&")) ?? document.querySelector(selector);
    },
    elementPath: function(element = null, options = {}) {
      element = element || this.target;
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
      element = element || this.target;
      const bounds = element.getBoundingClientRect();
      console.log("bounds", bounds.left, bounds.top);
      console.log("offset", element.offsetLeft, element.offsetTop);
      options = {
        radius: 24,
        margin: 10,
        offset: { x: 0, y: 0 },
        relative: false,
        ...options
      };
      const left = options.relative ? 0 : bounds.left;
      const top = options.relative ? 0 : element.offsetTop;
      console.log("left/top", left, top);
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vY29tcG9uZW50cy9zdGVwLmpzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBzdGVwQ29tcG9uZW50KHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGtleSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGVjdG9yLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVxdWlyZXNBY3Rpb24sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pIHtcbiAgICByZXR1cm4ge1xuICAgICAgICB0YXJnZXQ6IG51bGwsXG5cbiAgICAgICAgaW5pdGlhbGl6ZTogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdGhpcy50YXJnZXQgPSB0aGlzLmZpbmRFbGVtZW50KGtleSk7XG5cbiAgICAgICAgICAgIHRoaXMuY29uZmlndXJlKCk7XG5cbiAgICAgICAgICAgIC8vIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ2luaXRpYWxpemUnKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCd0aGlzLiRlbCcsIHRoaXMuJGVsKTtcbiAgICAgICAgICAgIGNvbnN0IGRpYWxvZyA9IHRoaXMuJHJvb3QucXVlcnlTZWxlY3RvcignW2RhdGEtZGlhbG9nXScpO1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ2RpYWxvZ29zJywgZGlhbG9nKTtcbiAgICAgICAgICAgIGNvbnN0IGNsaXBQYXRoID0gdGhpcy4kcm9vdC5xdWVyeVNlbGVjdG9yKCdbZGF0YS1jbGlwLXBhdGhdJyk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnY2xpcFBhdGgnLCBjbGlwUGF0aCk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygncmVxdWlyZXNBY3Rpb24nLCByZXF1aXJlc0FjdGlvbik7XG5cbiAgICAgICAgICAgIGlmIChyZXF1aXJlc0FjdGlvbikge1xuICAgICAgICAgICAgICAgIHRoaXMudGFyZ2V0LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGV2ZW50KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIC8vIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnJHdpcmUnLCB0aGlzLiR3aXJlLm5leHRUdXRvcmlhbFN0ZXAoKSk7XG5cbiAgICAgICAgICAgICAgICAgICAgdGhpcy50YXJnZXQuYmx1cigpO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBkZXNjZW5kYW50cyA9IHRoaXMudGFyZ2V0LnF1ZXJ5U2VsZWN0b3JBbGwoXCI6aG92ZXJcIik7XG5cbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBkZXNjZW5kYW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgZGVzY2VuZGFudCA9IGRlc2NlbmRhbnRzW2ldO1xuICAgICAgICAgICAgICAgICAgICAgICAgZGVzY2VuZGFudC5ibHVyKCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5pbml0aWFsaXplRGlhbG9nKCk7XG5cbiAgICAgICAgICAgIHRoaXMuJG5leHRUaWNrKCgpID0+IHtcbiAgICAgICAgICAgICAgICBjbGlwUGF0aC5zZXRBdHRyaWJ1dGUoJ2QnLCB0aGlzLmNsaXBQYXRoKCkpO1xuICAgICAgICAgICAgICAgIHRoaXMuJGRpc3BhdGNoKCd0dXRvcmlhbDo6cmVuZGVyJyk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgY2xpcFBhdGguc2V0QXR0cmlidXRlKCdkJywgdGhpcy5jbGlwUGF0aCgpKTtcbiAgICAgICAgICAgIC8vIH0sIDEpO1xuICAgICAgICB9LFxuXG4gICAgICAgIHRpbWVvdXRzOiBbXSxcblxuICAgICAgICBjb25maWd1cmU6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdjb25maWd1cmUnKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMudGFyZ2V0LnRhZ05hbWUpO1xuXG4gICAgICAgICAgICBpZiAodGhpcy50YXJnZXQgaW5zdGFuY2VvZiBIVE1MU2VsZWN0RWxlbWVudCkge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLnRhcmdldC5oYXNBdHRyaWJ1dGUoJ2RhdGEtY2hvaWNlJykpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50YXJnZXQgPSB0aGlzLnRhcmdldC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQ7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGRyb3Bkb3duID0gdGhpcy50YXJnZXQucXVlcnlTZWxlY3RvcignLmNob2ljZXNfX2xpc3QuY2hvaWNlc19fbGlzdC0tZHJvcGRvd24nKTtcbiAgICAgICAgICAgICAgICAgICAgZHJvcGRvd24uc3R5bGUuekluZGV4ID0gMTAwO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHRoaXMudGFyZ2V0LnRhZ05hbWUgPT09ICdUUklYLUVESVRPUicpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnRpbWVvdXRzWyd0cml4J10gPSB0aGlzLnRhcmdldC5jbGllbnRIZWlnaHQ7XG4gICAgICAgICAgICAgICAgdGhpcy50YXJnZXQgPSB0aGlzLnRhcmdldC5wYXJlbnRFbGVtZW50O1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdpcyB0cml4Jyk7XG5cblxuICAgICAgICAgICAgICAgIGNvbnN0IG9ic2VydmVyID0gbmV3IE11dGF0aW9uT2JzZXJ2ZXIoKG11dGF0aW9uc0xpc3QsIG9ic2VydmVyKSA9PiB7XG5cbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ3Jlc2l6ZWQnKTtcbiAgICAgICAgICAgICAgICAgICAgLy8gdGhpcy5pbml0aWFsaXplKCk7XG4gICAgICAgICAgICAgICAgICAgIG11dGF0aW9uc0xpc3QuZm9yRWFjaCgobXV0YXRpb24pID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdtdXRhdGlvbicsIG11dGF0aW9uKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGxldCBoZWlnaHQgPSBtdXRhdGlvbi50YXJnZXQuY2xpZW50SGVpZ2h0O1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBpZiAoaGVpZ2h0ICE9IHRoaXMudGltZW91dHNbJ3RyaXgtaGVpZ2h0J10pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICB0aGlzLnRpbWVvdXRzWyd0cml4LWhlaWdodCddID0gaGVpZ2h0O1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy50aW1lb3V0c1sndHJpeCddKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xlYXJUaW1lb3V0KHRoaXMudGltZW91dHNbJ3RyaXgnXSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudGltZW91dHNbJ3RyaXgnXSA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudGltZW91dHNbJ3RyaXgnXSA9IG51bGw7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5pbml0aWFsaXplKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9LCA1MDApO1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgaWYgKG11dGF0aW9uLnR5cGUgPT09ICdhdHRyaWJ1dGVzJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICBpZiAobXV0YXRpb24uYXR0cmlidXRlTmFtZSA9PT0gJ3dpZHRoJyB8fCBtdXRhdGlvbi5hdHRyaWJ1dGVOYW1lID09PSAnaGVpZ2h0Jykge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgY29uc3QgdGFyZ2V0ID0gbXV0YXRpb24udGFyZ2V0O1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgY29uc3QgbmV3V2lkdGggPSB0YXJnZXQub2Zmc2V0V2lkdGg7IC8vIG9yIHRhcmdldC5zdHlsZS53aWR0aFxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgY29uc3QgbmV3SGVpZ2h0ID0gdGFyZ2V0Lm9mZnNldEhlaWdodDsgLy8gb3IgdGFyZ2V0LnN0eWxlLmhlaWdodFxuICAgICAgICAgICAgICAgICAgICAgICAgLy9cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgIGNvbnNvbGUubG9nKGBXaWR0aCBjaGFuZ2VkIHRvOiAke25ld1dpZHRofWApO1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgY29uc29sZS5sb2coYEhlaWdodCBjaGFuZ2VkIHRvOiAke25ld0hlaWdodH1gKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICBjb25zdCBjb25maWcgPSB7XG4gICAgICAgICAgICAgICAgICAgIGF0dHJpYnV0ZXM6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIGF0dHJpYnV0ZUZpbHRlcjogWydoZWlnaHQnXSxcbiAgICAgICAgICAgICAgICAgICAgY2hpbGRMaXN0OiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBzdWJ0cmVlOiB0cnVlLFxuICAgICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICAgICBvYnNlcnZlci5vYnNlcnZlKHRoaXMudGFyZ2V0LCBjb25maWcpO1xuXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICh0aGlzLnRhcmdldCBpbnN0YW5jZW9mIEhUTUxUZXh0QXJlYUVsZW1lbnQgfHwgdGhpcy50KSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ2lzIHRleHRhcmVhJyk7XG4gICAgICAgICAgICAgICAgLy8gR2V0IHRoZSBpbml0aWFsIHNpemUgb2YgdGhlIHRleHRhcmVhXG4gICAgICAgICAgICAgICAgbGV0IGluaXRpYWxXaWR0aCA9IHRoaXMudGFyZ2V0Lm9mZnNldFdpZHRoO1xuICAgICAgICAgICAgICAgIGxldCBpbml0aWFsSGVpZ2h0ID0gdGhpcy50YXJnZXQub2Zmc2V0SGVpZ2h0O1xuXG4gICAgICAgICAgICAgICAgLy8gQ3JlYXRlIGEgTXV0YXRpb25PYnNlcnZlciB0byBtb25pdG9yIHNpemUgY2hhbmdlc1xuICAgICAgICAgICAgICAgIGNvbnN0IG9ic2VydmVyID0gbmV3IE11dGF0aW9uT2JzZXJ2ZXIoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy50YXJnZXQub2Zmc2V0V2lkdGggIT09IGluaXRpYWxXaWR0aCB8fCB0aGlzLnRhcmdldC5vZmZzZXRIZWlnaHQgIT09IGluaXRpYWxIZWlnaHQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdUZXh0YXJlYSB3YXMgcmVzaXplZC4nKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGluaXRpYWxXaWR0aCA9IHRoaXMudGFyZ2V0Lm9mZnNldFdpZHRoO1xuICAgICAgICAgICAgICAgICAgICAgICAgaW5pdGlhbEhlaWdodCA9IHRoaXMudGFyZ2V0Lm9mZnNldEhlaWdodDtcblxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMudGltZW91dHNbJ3RleHRhcmVhJ10pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGVhclRpbWVvdXQodGhpcy50aW1lb3V0c1sndGV4dGFyZWEnXSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudGltZW91dHNbJ3RleHRhcmVhJ10gPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnRpbWVvdXRzWyd0ZXh0YXJlYSddID0gbnVsbDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmluaXRpYWxpemUoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sIDEwMCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIC8vIFN0YXJ0IG9ic2VydmluZyBjaGFuZ2VzIGluIHRoZSB0ZXh0YXJlYSBlbGVtZW50XG4gICAgICAgICAgICAgICAgb2JzZXJ2ZXIub2JzZXJ2ZSh0aGlzLnRhcmdldCwge2F0dHJpYnV0ZXM6IHRydWUsIGF0dHJpYnV0ZUZpbHRlcjogWydzdHlsZSddfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIC8vIFlvdSBjYW4gZGVmaW5lIGFueSBvdGhlciBBbHBpbmUuanMgZnVuY3Rpb25zIGhlcmUuXG5cbiAgICAgICAgaW5pdGlhbGl6ZURpYWxvZzogZnVuY3Rpb24gKGRpYWxvZyA9IG51bGwpIHtcbiAgICAgICAgICAgIGlmICghZGlhbG9nKSB7XG4gICAgICAgICAgICAgICAgZGlhbG9nID0gdGhpcy4kcm9vdC5xdWVyeVNlbGVjdG9yKCdbZGF0YS1kaWFsb2ddJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zdCBkaWFsb2dQYXRoID0gZGlhbG9nLnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLWRpYWxvZy1wYXRoXScpO1xuXG4gICAgICAgICAgICBjb25zb2xlLmxvZygnaW5pdGlhbGl6ZURpYWxvZycpO1xuICAgICAgICAgICAgY29uc3QgcmVjdCA9IHRoaXMuZWxlbWVudFJlY3QoKTtcbiAgICAgICAgICAgIC8vIGNvbnN0IGhlYWRlciA9IGRpYWxvZy5xdWVyeVNlbGVjdG9yKCdbZGF0YS1kaWFsb2ctaGVhZGVyXScpO1xuICAgICAgICAgICAgY29uc3Qgc3Ryb2tlID0gZGlhbG9nLnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLWRpYWxvZy1zdHJva2VdJyk7XG5cbiAgICAgICAgICAgIHdpbmRvdy5zY3JvbGxUbyh7XG4gICAgICAgICAgICAgICAgdG9wOiByZWN0WzBdLnkgLSAod2luZG93LmlubmVySGVpZ2h0IC8gMyksXG4gICAgICAgICAgICAgICAgbGVmdDogcmVjdFswXS54LFxuICAgICAgICAgICAgICAgIGJlaGF2aW9yOiAnc21vb3RoJ1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGNvbnN0IHdpZHRoID0gcmVjdFsxXS54IC0gcmVjdFswXS54O1xuICAgICAgICAgICAgY29uc3QgaGVpZ2h0ID0gcmVjdFsyXS55IC0gcmVjdFswXS55O1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ0lNUE9SVEFOVCBIRVJFJyk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnd2lkdGgnLCB3aWR0aCk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnaGVpZ2h0JywgaGVpZ2h0KTtcbiAgICAgICAgICAgIC8vIHZhciB5MSA9IGhlYWRlci5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS50b3A7XG4gICAgICAgICAgICAvLyB2YXIgeTIgPSBzdHJva2UuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkudG9wO1xuXG4gICAgICAgICAgICAvLyB2YXIgZGlzdGFuY2UgPSB5MiAtIHkxO1xuXG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZygnZGlzdGFuY2UnLCBkaXN0YW5jZSwgeTIsIHkxKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdyZWN0JywgcmVjdCk7XG5cbiAgICAgICAgICAgIGNvbnN0IHggPSByZWN0WzBdLng7XG4gICAgICAgICAgICBjb25zdCB5ID0gcmVjdFswXS55O1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ3gnLCB4KTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCd5JywgeSk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnZGlhbG9nJywgZGlhbG9nKTtcbiAgICAgICAgICAgIC8vIGRpYWxvZyA9IHRoaXMuJHJvb3QucXVlcnlTZWxlY3RvcignW2RhdGEtZGlhbG9nXScpO1xuICAgICAgICAgICAgZGlhbG9nLnN0eWxlLndpZHRoID0gYCR7d2lkdGh9cHhgO1xuICAgICAgICAgICAgZGlhbG9nLnN0eWxlLnRyYW5zZm9ybSA9IGB0cmFuc2xhdGUoJHt4fXB4LCAke3l9cHgpYDtcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKCdEZWxheWVkIGRpYWxvZycsIGRpYWxvZyk7XG5cbiAgICAgICAgICAgIC8vIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLWRpYWxvZ10nKS5mb3JFYWNoKChkaWFsb2cpID0+IHtcbiAgICAgICAgICAgIC8vICAgIGRpYWxvZy5yZW1vdmUoKTtcbiAgICAgICAgICAgIC8vIH0pO1xuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coJ3NlbGYuJHJvb3QnLCBzZWxmLiRyb290KTtcbiAgICAgICAgICAgIC8vIHNlbGYuJHJvb3QuYXBwZW5kQ2hpbGQoZGlhbG9nKTtcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzb21ldGhpbmcnKSk7XG4gICAgICAgICAgICAvLyBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc29tZXRoaW5nJykuYXBwZW5kQ2hpbGQoZGlhbG9nKTtcbiAgICAgICAgICAgIC8vIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoZGlhbG9nKTtcbiAgICAgICAgICAgIC8vIH0sIDEwMDApO1xuICAgICAgICAgICAgc3Ryb2tlLnN0eWxlLmhlaWdodCA9IGAke2hlaWdodH1weGA7XG5cbiAgICAgICAgICAgIGRpYWxvZ1BhdGguc2V0QXR0cmlidXRlKCdkJywgdGhpcy5lbGVtZW50UGF0aChudWxsLCB7cmVsYXRpdmU6IHRydWUsIHBvc2l0aXZlOiB0cnVlfSkpXG4gICAgICAgIH0sXG5cbiAgICAgICAgY2xpcFBhdGg6IGZ1bmN0aW9uIChlbGVtZW50ID0gbnVsbCwgb3B0aW9ucyA9IHt9KSB7XG4gICAgICAgICAgICBlbGVtZW50ID0gZWxlbWVudCB8fCB0aGlzLnRhcmdldDtcbiAgICAgICAgICAgIG9wdGlvbnMgPSB7XG4gICAgICAgICAgICAgICAgcmFkaXVzOiAyNCxcbiAgICAgICAgICAgICAgICBtYXJnaW46IDEwLFxuICAgICAgICAgICAgICAgIG9mZnNldDoge3g6IDAsIHk6IDB9LFxuICAgICAgICAgICAgICAgIHJlbGF0aXZlOiBmYWxzZSxcbiAgICAgICAgICAgICAgICAuLi5vcHRpb25zXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gYCR7dGhpcy53aW5kb3dQYXRoKCl9ICR7dGhpcy5lbGVtZW50UGF0aChlbGVtZW50LCBvcHRpb25zKX1gLnRyaW0oKTtcbiAgICAgICAgfSxcblxuICAgICAgICB3aW5kb3dQYXRoOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBjb25zdCBkb2N1bWVudEhlaWdodCA9IE1hdGgubWF4KFxuICAgICAgICAgICAgICAgIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRIZWlnaHQsXG4gICAgICAgICAgICAgICAgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnNjcm9sbEhlaWdodCxcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQub2Zmc2V0SGVpZ2h0LFxuICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgLy8gVE9ETzogYWRkIG9wdGlvbiB0byBzZWxlY3QgY2xvY2t3aXNlIC9jb3VudGVyIGNsb2Nrd2lzZVxuICAgICAgICAgICAgLy9NIDAgOCBDIDAgMCAwIDAgOCAwIEwgMzggMCBDIDQ2IDAgNDYgMCA0NiA4IEMgNDYgMTYgNDYgMTYgMzggMTYgTCA4IDE2IEMgMCAxNiAwIDE2IDAgOFxuICAgICAgICAgICAgbGV0IHBhdGggPSAnTSAwIDAgJztcbiAgICAgICAgICAgIHBhdGggKz0gJ0wgMCAnICsgZG9jdW1lbnRIZWlnaHQgKyAnICc7XG4gICAgICAgICAgICBwYXRoICs9ICdMICcgKyB3aW5kb3cuaW5uZXJXaWR0aCArICcgJyArIGRvY3VtZW50SGVpZ2h0ICsgJyAnO1xuICAgICAgICAgICAgcGF0aCArPSAnTCAnICsgd2luZG93LmlubmVyV2lkdGggKyAnIDAgJztcbiAgICAgICAgICAgIHBhdGggKz0gJ0wgMCAwICc7XG5cbiAgICAgICAgICAgIHJldHVybiBwYXRoLnRyaW0oKTtcbiAgICAgICAgfSxcblxuICAgICAgICBmaW5kRWxlbWVudDogZnVuY3Rpb24gKG5hbWUpIHtcbiAgICAgICAgICAgIHJldHVybiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHNlbGVjdG9yLnJlcGxhY2UoL1xcLi9nLCAnXFxcXCQmJykpXG4gICAgICAgICAgICAgICAgPz8gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihzZWxlY3Rvcik7XG4gICAgICAgIH0sXG5cbiAgICAgICAgZWxlbWVudFBhdGg6IGZ1bmN0aW9uIChlbGVtZW50ID0gbnVsbCwgb3B0aW9ucyA9IHt9KSB7XG4gICAgICAgICAgICBlbGVtZW50ID0gZWxlbWVudCB8fCB0aGlzLnRhcmdldDtcbiAgICAgICAgICAgIG9wdGlvbnMgPSB7XG4gICAgICAgICAgICAgICAgcmFkaXVzOiAyNCxcbiAgICAgICAgICAgICAgICBtYXJnaW46IDEwLFxuICAgICAgICAgICAgICAgIG9mZnNldDoge3g6IDAsIHk6IDB9LFxuICAgICAgICAgICAgICAgIC4uLm9wdGlvbnNcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0IHJlY3QgPSB0aGlzLmVsZW1lbnRSZWN0KGVsZW1lbnQsIHtcbiAgICAgICAgICAgICAgICByZWxhdGl2ZTogZmFsc2UsXG4gICAgICAgICAgICAgICAgLi4ub3B0aW9ucyxcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBsZXQgcGF0aCA9ICcnO1xuICAgICAgICAgICAgcGF0aCArPSAnTSAnICsgcmVjdFswXS54ICsgJyAnICsgKHJlY3RbMF0ueSArIG9wdGlvbnMucmFkaXVzKSArICcgJztcbiAgICAgICAgICAgIHBhdGggKz0gJ0MgJyArIHJlY3RbMF0ueCArICcgJyArIHJlY3RbMF0ueSArICcgJyArIHJlY3RbMF0ueCArICcgJyArIHJlY3RbMF0ueSArICcgJyArIChyZWN0WzBdLnggKyBvcHRpb25zLnJhZGl1cykgKyAnICcgKyByZWN0WzBdLnkgKyAnICc7XG4gICAgICAgICAgICBwYXRoICs9ICdMICcgKyAocmVjdFsxXS54IC0gb3B0aW9ucy5yYWRpdXMpICsgJyAnICsgcmVjdFsxXS55ICsgJyAnO1xuICAgICAgICAgICAgcGF0aCArPSAnQyAnICsgcmVjdFsxXS54ICsgJyAnICsgcmVjdFsxXS55ICsgJyAnICsgcmVjdFsxXS54ICsgJyAnICsgcmVjdFsxXS55ICsgJyAnICsgcmVjdFsxXS54ICsgJyAnICsgKHJlY3RbMV0ueSArIG9wdGlvbnMucmFkaXVzKSArICcgJztcbiAgICAgICAgICAgIHBhdGggKz0gJ0wgJyArIHJlY3RbMl0ueCArICcgJyArIChyZWN0WzJdLnkgLSBvcHRpb25zLnJhZGl1cykgKyAnICc7XG4gICAgICAgICAgICBwYXRoICs9ICdDICcgKyByZWN0WzJdLnggKyAnICcgKyByZWN0WzJdLnkgKyAnICcgKyByZWN0WzJdLnggKyAnICcgKyByZWN0WzJdLnkgKyAnICcgKyAocmVjdFsyXS54IC0gb3B0aW9ucy5yYWRpdXMpICsgJyAnICsgcmVjdFsyXS55ICsgJyAnO1xuICAgICAgICAgICAgcGF0aCArPSAnTCAnICsgKHJlY3RbM10ueCArIG9wdGlvbnMucmFkaXVzKSArICcgJyArIHJlY3RbM10ueSArICcgJztcbiAgICAgICAgICAgIHBhdGggKz0gJ0MgJyArIHJlY3RbM10ueCArICcgJyArIHJlY3RbM10ueSArICcgJyArIHJlY3RbM10ueCArICcgJyArIHJlY3RbM10ueSArICcgJyArIHJlY3RbM10ueCArICcgJyArIChyZWN0WzNdLnkgLSBvcHRpb25zLnJhZGl1cykgKyAnICc7XG4gICAgICAgICAgICAvLyBwYXRoICs9ICdaJztcbiAgICAgICAgICAgIHBhdGggKz0gJ0wgJyArIHJlY3RbMF0ueCArICcgJyArIChyZWN0WzBdLnkgKyBvcHRpb25zLnJhZGl1cykgKyAnICc7XG5cbiAgICAgICAgICAgIHJldHVybiBwYXRoLnRyaW0oKTtcbiAgICAgICAgfSxcblxuICAgICAgICBlbGVtZW50UmVjdDogZnVuY3Rpb24gKGVsZW1lbnQgPSBudWxsLCBvcHRpb25zID0ge30pIHtcblxuICAgICAgICAgICAgZWxlbWVudCA9IGVsZW1lbnQgfHwgdGhpcy50YXJnZXQ7XG4gICAgICAgICAgICBjb25zdCBib3VuZHMgPSBlbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ2JvdW5kcycsIGJvdW5kcy5sZWZ0LCBib3VuZHMudG9wKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdvZmZzZXQnLCBlbGVtZW50Lm9mZnNldExlZnQsIGVsZW1lbnQub2Zmc2V0VG9wKTtcbiAgICAgICAgICAgIG9wdGlvbnMgPSB7XG4gICAgICAgICAgICAgICAgcmFkaXVzOiAyNCxcbiAgICAgICAgICAgICAgICBtYXJnaW46IDEwLFxuICAgICAgICAgICAgICAgIG9mZnNldDoge3g6IDAsIHk6IDB9LFxuICAgICAgICAgICAgICAgIHJlbGF0aXZlOiBmYWxzZSxcbiAgICAgICAgICAgICAgICAuLi5vcHRpb25zXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zdCBsZWZ0ID0gb3B0aW9ucy5yZWxhdGl2ZSA/IDAgOiBib3VuZHMubGVmdDtcbiAgICAgICAgICAgIGNvbnN0IHRvcCA9IG9wdGlvbnMucmVsYXRpdmUgPyAwIDogZWxlbWVudC5vZmZzZXRUb3A7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnbGVmdC90b3AnLCBsZWZ0LCB0b3ApO1xuXG4gICAgICAgICAgICBsZXQgcmVzdWx0ID0gW1xuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgeDogbGVmdCAtIG9wdGlvbnMubWFyZ2luICsgb3B0aW9ucy5vZmZzZXQueCxcbiAgICAgICAgICAgICAgICAgICAgeTogdG9wIC0gb3B0aW9ucy5tYXJnaW4gKyBvcHRpb25zLm9mZnNldC55XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHg6IGxlZnQgKyBlbGVtZW50LmNsaWVudFdpZHRoICsgb3B0aW9ucy5tYXJnaW4gKyBvcHRpb25zLm9mZnNldC54LFxuICAgICAgICAgICAgICAgICAgICB5OiB0b3AgLSBvcHRpb25zLm1hcmdpbiArIG9wdGlvbnMub2Zmc2V0LnlcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgeDogbGVmdCArIGVsZW1lbnQuY2xpZW50V2lkdGggKyBvcHRpb25zLm1hcmdpbiArIG9wdGlvbnMub2Zmc2V0LngsXG4gICAgICAgICAgICAgICAgICAgIHk6IHRvcCArIGVsZW1lbnQuY2xpZW50SGVpZ2h0ICsgb3B0aW9ucy5tYXJnaW4gKyBvcHRpb25zLm9mZnNldC55XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHg6IGxlZnQgLSBvcHRpb25zLm1hcmdpbiArIG9wdGlvbnMub2Zmc2V0LngsXG4gICAgICAgICAgICAgICAgICAgIHk6IHRvcCArIGVsZW1lbnQuY2xpZW50SGVpZ2h0ICsgb3B0aW9ucy5tYXJnaW4gKyBvcHRpb25zLm9mZnNldC55XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgXTtcblxuICAgICAgICAgICAgaWYgKG9wdGlvbnMucG9zaXRpdmUpIHtcbiAgICAgICAgICAgICAgICBsZXQgbWluWCA9IDA7XG4gICAgICAgICAgICAgICAgbGV0IG1pblkgPSAwO1xuXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCByZXN1bHQubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlc3VsdFtpXS54IDwgbWluWCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgbWluWCA9IHJlc3VsdFtpXS54O1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlc3VsdFtpXS55IDwgbWluWSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgbWluWSA9IHJlc3VsdFtpXS55O1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCByZXN1bHQubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0W2ldLnggLT0gbWluWDtcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0W2ldLnkgLT0gbWluWTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgIH1cbiAgICB9XG59Il0sCiAgIm1hcHBpbmdzIjogIjtBQUFlLFNBQVIsY0FBK0I7QUFBQSxFQUNJO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFDSixHQUFHO0FBQ3JDLFNBQU87QUFBQSxJQUNILFFBQVE7QUFBQSxJQUVSLFlBQVksV0FBWTtBQUNwQixXQUFLLFNBQVMsS0FBSyxZQUFZLEdBQUc7QUFFbEMsV0FBSyxVQUFVO0FBR2YsY0FBUSxJQUFJLFlBQVk7QUFDeEIsY0FBUSxJQUFJLFlBQVksS0FBSyxHQUFHO0FBQ2hDLFlBQU0sU0FBUyxLQUFLLE1B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
