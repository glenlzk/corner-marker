import Vue from 'vue';
import cornerMarkerVim from './corner-marker.vue';
import { isVNode } from 'element-ui/src/utils/vdom';
let cornerMarkerConstructor = Vue.extend(cornerMarkerVim);

let instances = [];
let seed = 1;

const cornerMarker = function(options) {
  if (Vue.prototype.$isServer) return;

  let instance;

  options = options || {};

  if(!options.content || !options.el) return;
  
  let id = 'corner-marker_' + seed++;

  instance = new cornerMarkerConstructor();
  instances.push(instance);

  instance.id = id;

  if(isVNode(options.content)) {
    instance.$slots.content = [options.content];
  } else {
    instance.$props.content = options.content;
  }

  instance.$mount()

  instance.appendDom(options.el);

  return instance;
};


export default cornerMarker;
