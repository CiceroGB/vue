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
        valueVariable: ["Mensal", "Anual", "12 meses", "Peso no mês"],
        itemsGroup: [],
        valueGroup: "Índice geral",
      },
      selectedDatesInitial: "",
      selectedDatesFinal: [],
      selectedItemsVariable: [],
      selectedItemsGroup: [],
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
          categories: ["janeiro  2019"],
        },
      },
      series: [
        {
          name: "series-1",
          data: [30],
        },
        {
          name: "series-2",
          data: [10],
        },
      ],
    };
  },

  methods: {
    chageVariacao(selectObj) {
      console.log(selectObj);
    },
    chageGroup(selectObj) {
      console.log(selectObj);
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
    },

    reChart() {},
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
  },
};
</script>
