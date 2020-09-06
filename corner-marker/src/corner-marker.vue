<script>
  import Vue from 'vue';
  export default {
    name: 'XuiCornerMarker',
    data () {
      return {};
    },
    props: {
      content: String,
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
              <span ref="cornerDiv" class="triangle bottom-right"></span>
          </el-tooltip>
        );
      }

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