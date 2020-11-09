<template>
  <v-container fluid tag="section">
    <v-container fluid>
      <section class="text-center">
        <h1 class="font-weight-light mb-2 headline">{{ $route.name }}</h1>
      </section>
      <v-row align="center">
        <v-col class="d-flex" sm="3">
          <v-select
            v-model="select.valueVariable"
            :items="select.itemsVariable"
            attach
            @change="chageVariacao"
            label="Variação"
            multiple
          ></v-select>
        </v-col>
        <v-col class="d-flex" sm="3">
          <v-select
            v-model="select.valueGroup"
            :items="select.itemsGroup"
            @change="chageGroup"
            label="Grupo"
          ></v-select>
        </v-col>
        <v-col class="d-flex" sm="3">
          <v-select
            v-model="selectedDatesInitial"
            :items="datesInitial"
            @change="chageInitialDate"
            class=""
            label="Data Inicial"
          ></v-select>
        </v-col>
        <v-col class="d-flex" sm="3">
          <v-select
            v-model="selectedDatesFinal"
            :items="datesFinal"
            @change="chageFinalDate"
            label="Data final"
          ></v-select>
        </v-col>

        <v-card class="mx-auto my-12" max-width="1000">
          <div class="d-flex justify-center">
            <apexchart
              width="820"
              type="line"
              :options="chartOptions"
              :series="series"
            ></apexchart>
          </div>
        </v-card>
      </v-row>
    </v-container>
  </v-container>
</template>



<script>
export default {
  data() {
    return {
      select: {
        itemsVariable: ["Mensal", "Anual", "12 meses", "Peso no mês"],
        valueVariable: ["Mensal", "Anual", "12 meses"],
        itemsGroup: [],
        valueGroup: "Índice geral",
      },
      selectedDatesInitial: [],
      selectedDatesFinal: [],
      rageDate: [],
      ipcaAll: [],
      datesAll: [],
      datesInitial: [],
      datesFinal: [],
      chart: {
        toolbar: {
          show: false,
        },
      },
      chartOptions: {
        chart: {
          toolbar: {
            show: false,
          },
        },
        xaxis: {
          categories: [],
        },
      },
      series: [],
    };
  },

  methods: {
    chageVariacao() {
      this.reChart();
    },
    chageGroup() {
      this.reChart();
    },
    chageInitialDate(selectObj) {
      const indexFinal = this.datesAll.indexOf(selectObj);
      const indexInicial = this.datesAll.indexOf(this.selectedDatesInitial);

      if (indexInicial > indexFinal) {
        this.selectedDatesFinal = this.dates[indexFinal];
      }
      this.datesFinal = this.dates.filter(
        (item) => this.dates.indexOf(item) <= indexFinal
      );
      this.reChart();
    },
    chageFinalDate(selectObj) {
      const indexFinal = this.datesAll.indexOf(selectObj);
      const indexInicial = this.datesAll.indexOf(this.selectedDatesInitial);

      if (indexInicial < indexFinal) {
        this.selectedDatesInitial = this.dates[indexFinal];
      }
      this.datesInitial = this.dates.filter(
        (item) => this.dates.indexOf(item) >= indexFinal
      );
      this.reChart();
    },

    reChart() {
      const indexFinal = this.datesAll.indexOf(this.selectedDatesFinal);
      const indexInicial = this.datesAll.indexOf(this.selectedDatesInitial);
      this.rageDate = this.datesAll.filter(
        (item) =>
          this.dates.indexOf(item) >= indexFinal &&
          this.dates.indexOf(item) <= indexInicial
      );
      this.chartOptions = {
        xaxis: {
          categories: this.rageDate.reverse(),
        },
      };

      this.ipcaFilter = this.ipcaAll.filter(
        (item) => item.D4N === this.select.valueGroup
      );

      this.ipcaFilter = this.ipcaFilter.filter((item) =>
        this.rageDate.includes(item.D3N)
      );

      const ary = [];

      if (this.select.valueVariable.includes("Mensal")) {
        ary.push("IPCA - Variação mensal");
      }
      if (this.select.valueVariable.includes("Anual")) {
        ary.push("IPCA - Variação acumulada no ano");
      }
      if (this.select.valueVariable.includes("12 meses")) {
        ary.push("IPCA - Variação acumulada em 12 meses");
      }
      if (this.select.valueVariable.includes("Peso no mês")) {
        ary.push("IPCA - Peso mensal");
      }

      this.ipcaFilter = this.ipcaFilter.filter((item) =>
        ary.includes(item.D2N)
      );

      let seriesFill = [];
      let variable = "";
      let arr = [];
      this.series = [];

      ary.map((item) => {
        console.log(variable);
        variable = item;
        arr = this.ipcaFilter.filter((key) => key.D2N === variable);
        arr = arr.sort((a, b) => parseFloat(a.D3C) - parseFloat(b.D3C));
        seriesFill = arr.map((item) => item.V);
        this.series = [
          ...this.series,
          {
            name: variable,
            data: seriesFill,
          },
        ];

        console.log(seriesFill);
      });

      // console.log(this.ipcaFilter);
      // console.log(this.select.valueGroup);
      // console.log(this.select.valueVariable);
      console.log(seriesFill);
      console.log(variable);
      console.log(arr);
    },
  },

  computed: {
    lists() {
      return this.$store.getters.allLists;
    },
    dates() {
      return this.$store.getters.allDates;
    },
  },
  async mounted() {
    if (this.lists.length === 0) {
      await this.$store.dispatch("getLists");
    }

    this.ipcaAll = this.lists;
    this.select.itemsGroup = this.ipcaAll.reduce((prev, current) => {
      const x = prev.find((item) => item.D4N === current.D4N);
      if (!x) {
        return prev.concat([current]);
      } else {
        return prev;
      }
    }, []);

    this.select.itemsGroup = this.select.itemsGroup.map((item) => item.D4N);

    this.datesAll = this.dates;
    this.datesInitial = this.dates;
    this.datesFinal = this.dates;

    this.selectedDatesInitial = this.dates[6];
    this.selectedDatesFinal = this.dates[0];

    this.reChart();
  },
};
</script>
