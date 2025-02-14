<template>
    <div v-if="content">
      <span>{{ isTextTruncated ? truncatedText : content }}</span>
      <button 
        v-if="isTextTruncated" 
        @click="toggleShowMore" 
        class="flex p-link hover:underline text-blue-600 text-sm">
        {{ expanded ? 'Tampilkan sedikit' : 'Tampilkan semua' }}
      </button>
    </div>
  </template>
  
  <script>
  export default {
    name: "ShowMore",
    props: {
      content: {
        type: String,
        default: ''
      },
      maxLength: {
        type: Number,
        default: 100
      }
    },
    data() {
      return {
        expanded: false
      };
    },
    computed: {
      truncatedText() {
        if (this.content && this.content.length > this.maxLength && !this.expanded) {
          return this.content.substring(0, this.maxLength) + '...';
        }
        return this.content;
      },
      isTextTruncated() {
        return this.content && this.content.length > this.maxLength;
      }
    },
    methods: {
      toggleShowMore() {
        this.expanded = !this.expanded;
      }
    }
  };
  </script>
  