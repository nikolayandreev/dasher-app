<template>
  <div id="main">
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <div>
            <client-only placeholder="Зареждане..">
              <apexchart
                width="500"
                type="bar"
                :options="barChart.chartOptions"
                :series="barChart.series"
              ></apexchart>
            </client-only>
            <!-- <client-only placeholder="Зареждане..">
              <apexchart
                width="500"
                type="area"
                :options="areaChart.chartOptions"
                :series="areaChart.series"
              ></apexchart>
            </client-only> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        barChart: {
          chartOptions: {
            chart: {
              id: "vuechart-example",
            },
            xaxis: {
              categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998],
            },
          },
          series: [
            {
              name: "series-1",
              data: [30, 40, 35, 50, 49, 60, 70, 91],
            },
            {
              name: "series-2",
              data: [40, 30, 50, 35, 60, 49, 91, 70],
            },
          ],
        },
      };
    },
  };
</script>