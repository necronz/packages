<template>
  <div>
    <b-table
      class="mt-4"
      hover
      :fields="fields"
      :items="data"
      @row-clicked="$emit('onRowClick', $event)"
    />
    <div class="pagination">
      <b-button
        variant="light"
        class="mr-3"
        @click="$emit('onPrev')"
      >
        Prev
      </b-button>
      Page {{ currentPage }}
      <b-button
        variant="light"
        class="ml-3"
        @click="$emit('onNext')"
      >
        Next
      </b-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Table',
  props: {
    data: Array,
    currentPage: Number
  },
  data: () => ({
    fields: ['type', 'name']
  })
}
</script>

<style lang="scss" scoped>
.pagination {
  display: flex;
  align-items: center;
  margin-left: auto;
  width: fit-content;
}
</style>