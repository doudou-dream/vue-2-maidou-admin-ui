<template>
  <div class="d-menu">
    <div
      v-for="item in menu.list"
      :key="item.id"
      class="menu-item"
      :class="{'menu-item-ed': menu.selected === item.step}"
      @click="wayClick(item)"
    >{{ item.title }}</div>
  </div>
</template>

<script>
export default {
  name: 'DMenu',
  props: {
    list: {
      type: Array,
      default: () => []
    },
    selected: {
      type: Number,
      default: 1
    }
  },
  data() {
    return {
      menu: {
        selected: 1,
        list: []
      }
    }
  },
  watch: {
    list: {
      handler(val, oldVal) {
        this.menu.list = val
      }
    },
    selected: {
      handler(val, oldVal) {
        this.menu.selected = val
      }
    }
  },
  mounted() {
    this.menu.list = this.list
    this.menu.selected = this.selected
  },
  methods: {
    wayClick(item) {
      this.menu.selected = item.step
      this.$emit('wayChange', item)
    }
  }
}
</script>

<style scoped lang="sass">
.d-menu
  flex-shrink: 0
  width: 150px
  height: 100%
  .menu-item
    width: 100%
    display: flex
    align-items: center
    justify-content: center
    cursor: pointer
    padding: 0.5rem 1rem
    border-radius: 0.5rem
    position: relative
    margin: 0.25rem 0
    &:hover
      background-color: #007C7F
      color: white
  .menu-item-ed
    color: white
    background-color: #27AB85
</style>
