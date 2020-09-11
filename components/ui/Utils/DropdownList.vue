<template>
  <nav>
    <template v-for="(group,index) in groups">
      <h4
        :key="`${index}_label`"
        v-if="group.label"
      >{{ group.label }}</h4>
      <ul
        :key="`${index}_list`"
        v-if="group"
      >
        <li
          :key="`${index}_listItem`"
          v-for="(item, index) in group.items"
        >
          <!-- If it's a link  -->
          <nuxt-link
            v-if="item.href"
            :to="item.href"
            :title="item.title"
          >
            <i
              :class="[item.iconClass, item.iconSize]"
              v-if="item.iconClass"
            ></i>
            <span class="text">{{ item.title }}</span>
          </nuxt-link>
          <!-- If it's a button  -->
          <button
            v-else
            @click="item.onClick"
          >
            <i
              :class="[item.iconClass, item.iconSize]"
              v-if="item.iconClass"
            ></i>
            <span class="text">{{ item.title }}</span>
          </button>
        </li>
      </ul>
      <hr
        :key="`${index}_separator`"
        v-if="groups.length !== index + 1"
      />
    </template>
  </nav>
</template>

<script>
export default {
  props: {
    groups: {
      type: Array,
      required: true,
    },
  },
}
</script>

<style lang="scss" scoped>
nav {
  width: 100%;
  display: inline-block;
  h4 {
    margin: 0.5em 0;
    opacity: 0.25;
    padding-left: 0.8em;
    font-size: 0.9em;
    font-weight: 500;
  }
  ul {
    margin: 0;
    padding: 0;
    list-style-type: none;
    li {
      display: block;
      a,
      button {
        text-align: left;
        text-decoration: none;
        background: #fff;
        border: none;
        outline: none;
        color: lighten(#333447, 20);
        padding: 0.5em 1em;
        font-size: 0.9em;
        font-weight: 400;
        display: flex;
        width: 100%;
        flex-flow: row wrap;
        align-items: center;
        cursor: pointer;
        &:hover {
          background: #f3f6f9;
          color: #3699ff;
        }
        i {
          margin-right: 0.5em;
          font-size: 1.3em;
          line-height: 1;
        }
      }
    }
  }
  hr {
    margin: 0.75em 0;
    border: none;
    border-bottom: 1px solid #ebedf3;
  }
}
//   color: #3699ff;
//   color: #b5b5c3;
</style>