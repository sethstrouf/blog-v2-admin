<script lang="ts">
  export let date: Date

  const getDate = (date: Date) => {
    const month = date.toLocaleString('default', { month: 'long' });
    const day = date.getDate().toString().padStart(2, "0");

    return `${month} ${day}, ${date.getFullYear()}`
  }
</script>

<time>{getDate(new Date(date))}</time>
