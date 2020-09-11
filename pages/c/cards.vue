<template>
  <div id="main">
    <div class="container">
      <div class="row">
        <div class="col-md-4">
          <v-card
            title="Резервации"
            subTitle="Резервации последната седмица"
          >
            <template #options>
              <v-dropdown
                v-model="showDropdown"
                direction="right"
              >
                <v-button
                  :class="{'active': showDropdown}"
                  icon
                  buttonSize="xs"
                  buttonClass="hover-light-primary"
                  depressed
                >
                  <i class="ri-more-2-fill ri-3x"></i>
                </v-button>
                <template #dropdown>
                  <v-list :groups="dropdownGroups"></v-list>
                </template>
              </v-dropdown>
            </template>

            <template #content>
              <client-only>
                <div>
                  <apexcharts
                    width="100%"
                    height="auto"
                    type="area"
                    :options="chartOptions"
                    :series="series"
                  ></apexcharts>
                </div>
              </client-only>
            </template>
          </v-card>
        </div>
        <div class="col-md-4"></div>
        <div class="col-md-4"></div>
      </div>
      <br /><br />
      <br /><br />
    </div>
  </div>
</template>

<script>
import VCard from '~/components/ui/Card'
import VButton from '~/components/ui/Button'
import VDropdown from '~/components/ui/Utils/Dropdown'
import VList from '~/components/ui/Utils/DropdownList'

export default {
  components: {
    VCard,
    VButton,
    VDropdown,
    VList,
    apexcharts: () => {
      if (process.client) {
        return import('vue-apexcharts')
      }
    },
  },
  data() {
    return {
      showDropdown: false,
      dropdownGroups: [
        {
          label: 'Group 1',
          items: [
            {
              href: '#',
              title: 'Settings',
              iconClass: 'ri-settings-5-fill',
            },
            {
              href: '#',
              title: 'Calls',
              iconClass: 'ri-phone-line',
            },
            {
              href: '#',
              title: 'Questions',
              iconClass: 'ri-question-line',
            },
            {
              href: null,
              title: 'Regular Button',
              onClick: () => {},
            },
          ],
        },
        {
          label: 'Group 2',
          items: [
            {
              href: '/c/dropdowns',
              title: 'Dropdowns',
            },
            {
              href: '/c/buttons',
              title: 'Buttons',
            },
          ],
        },
      ],
      chartOptions: {
        chart: {
          width: '100%',
          offsetX: 0,
          offsetY: 0,
          height: 350,
          type: 'area',
          sparkline: {
            enabled: true,
          },
          toolbar: {
            show: false,
          },
        },
        dataLabels: {
          enabled: false,
        },
        stroke: {
          curve: 'smooth',
        },
        xaxis: {
          labels: { show: false },
          type: 'numeric',
          axisBorder: {
            show: false,
          },
          tooltip: {
            enabled: false,
          },
          axisTicks: {
            show: false,
          },
        },
      },
      series: [
        {
          data: [31, 40, 28, 51, 42, 109, 100],
        },
        {
          data: [11, 32, 45, 32, 34, 52, 41],
        },
      ],
    }
  },
}
</script>