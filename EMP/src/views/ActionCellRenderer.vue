<!-- ActionCellRenderer.vue -->
<template>
  <div>
    <button @click="onView" class="bg-blue-500 text-white py-1 px-2 rounded m-5 justify-center item-center content-center">View</button>
    <button @click="onEdit" class="bg-yellow-500 text-white py-1 px-2 rounded m-1">Edit</button>
    <button @click="onDelete" class="bg-red-500 text-white py-1 px-2 rounded m-1">Delete</button>
  </div>
</template>

<script>
export default {
  props: ['params'],
  methods: {
    onView() {
      this.params.onView(this.params.data);
    },
    onEdit() {
      this.params.onEdit(this.params.data);
    },
    onDelete() {
      this.params.onDelete(this.params.data);
    }
  }
}
</script>

<style scoped>
button {
  padding: 5px 10px;
  margin-right: 5px;
}
</style>
