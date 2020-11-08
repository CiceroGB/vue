<template>
  <v-container fluid tag="section">
    <v-container fluid>
      <section class="text-center">
        <h1 class="font-weight-light mb-2 headline">{{ $route.name }}</h1>
      </section>
      <v-row align="center">
        <v-col class="d-flex" sm="3">
          <v-select
            v-model="select.itemsVariable"
            :items="select.valueVariable"
            attach
            label="Variação"
            multiple
          ></v-select>
        </v-col>
        <v-col class="d-flex" sm="3">
          <v-select
            v-model="select.itemsGroup"
            :items="select.valueGroup"
            label="Grupo"
          ></v-select>
        </v-col>
        <v-col class="d-flex" sm="3">
          <v-select label="Data final"></v-select>
        </v-col>
        <v-col class="d-flex" sm="3">
          <v-select label="Data final"></v-select>
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
        itemsGroup: ["Mensal", "Anual", "12 meses", "Peso no mês"],
        valueGroup: ["Mensal", "Anual", "12 meses", "Peso no mês"],
      },

      chartOptions: {
        xaxis: {
          categories: [
            "janeiro  2019",
            "janeiro  2019",
            "janeiro  2019",
            "janeiro  2019",
            "janeiro  2019",
            "janeiro  2019",
            "janeiro  2019",
            "janeiro  2019",
            "janeiro  2019",
            "janeiro  2019",
            "janeiro  2019",
            "janeiro  2019",
            "janeiro  2019",
            "janeiro  2019",
            "janeiro  2019",
            "janeiro  2019",
          ],
        },
      },
      series: [
        {
          name: "series-1",
          data: [
            30,
            40,
            35,
            50,
            49,
            60,
            70,
            91,
            30,
            40,
            35,
            50,
            49,
            60,
            70,
            91,
          ],
        },
        {
          name: "series-2",
          data: [
            10,
            50,
            55,
            80,
            89,
            70,
            80,
            81,
            30,
            40,
            35,
            50,
            49,
            60,
            70,
            91,
          ],
        },
      ],
    };
  },

  computed: {
    lists() {
      return this.$store.getters.allLists;
    },
  },
  async mounted() {
    if (this.lists.length === 0) {
      await this.$store.dispatch("getLists");
    }
    



  },
};
</script>
