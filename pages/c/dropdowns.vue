<template>
  <div id="main">
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <v-dropdown
            v-model="showDropdown"
            direction="left"
          >
            <v-button
              :class="{'active': showDropdown}"
              icon
              buttonSize="xs"
              buttonClass="hover-light-primary"
              depressed
            >
              <i class="ri-more-2-fill ri-3x"></i>
              Show Dropdown
            </v-button>
            <template #dropdown>
              <v-list :groups="dropdownGroups"></v-list>
            </template>
          </v-dropdown>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import VButton from '~/components/ui/Button'
import VDropdown from '~/components/ui/Utils/Dropdown'
import VList from '~/components/ui/Utils/DropdownList'

export default {
  components: {
    VButton,
    VDropdown,
    VList,
  },
  data() {
    return {
      showDropdown: false,
      dropdownGroups: [
        {
          label: 'Test 1',
          items: [
            {
              href: '#',
              title: 'Homepage',
              iconClass: 'ri-checkbox-circle-fill',
            },
            {
              href: '#',
              title: 'Dropdowns',
              iconClass: 'ri-checkbox-circle-fill',
            },
          ],
        },
      ],
    }
  },
}
</script>