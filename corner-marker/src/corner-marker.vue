<script>
  import Vue from 'vue';
  export default {
    name: 'XuiCornerMarker',
    data () {
      return {};
    },
    props: {
      content: String,
      commmentClass: String,
      commentType: {
        default: 'angle',
        validator(val) {
          return ['angle', 'dot'].indexOf(val) !== -1;
        }
      },
      placement: {
        default: 'top-right',
        validator(val) {
          return ['top-left', 'top-right', 'bottom-left', 'bottom-right'] !== -1;
        }
      },
      color: String
    },
    computed: {
      cornerColor () {
        let pos = this.placement.split('-')[0];
        if(!~['top', 'bottom'].indexOf(pos)) return;
        return {
          [`border-${pos}-color`]: this.color
        }
      }
    },
    beforeCreate() {
        this.corner = new Vue({
          data: { node: '' },
          render(h) {
            return this.node;
          }
        }).$mount();
    },
    render(h) {

      if(this.corner) {
        this.corner.node = (
          <el-tooltip 
              ref="comments" 
              class="item" 
              effect="dark" 
              placement="top">
              <template slot="content">{this.$slots.content || this.content}</template>
              <span ref="cornerDiv" 
                class={
                  [
                    this.placement,
                    this.commentType? `triangle-${this.commentType}` : '',
                    this.commmentClass
                  ]}
                style={this.cornerColor}
                >
                </span>
          </el-tooltip>
        );
      }
      // triangle bottom-right
      // this.corner.$nextTick(() => {
      //   console.log(this.$refs.cornerDiv);          //  <span ref="cornerDiv"
      //   console.log(this.corner.$refs.cornerDiv);   // undefined
      //   console.log(this.$refs.comments.$refs.cornerDiv);   // undefined
      // });
      
      const firstElement = this.getFirstElement();

      if (!firstElement) return null;

      const data = firstElement.data = firstElement.data || {};

      return firstElement;
    },
    mounted() {

      if(this.$el.nodeType === 1) {
        this.appendDom(this.$el);
      }

      console.log(this.cornerColor);
      
    },
    methods: {
      appendDom(dom) {
        this.corner.$nextTick(() => {
          dom.appendChild(this.$refs.cornerDiv);
          dom.style.position = 'relative';
        });
      },
      getFirstElement() {
        const slots = this.$slots.default;
        if (!Array.isArray(slots)) return null;
        let element = null;
        for (let index = 0; index < slots.length; index++) {
          if (slots[index] && slots[index].tag) {
            element = slots[index];
          };
        }
        return element;
      }
    }
  }
</script>