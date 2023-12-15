<script setup lang="ts">
import { ref, onMounted } from "vue";

interface Todo {
  name: string;
  done: boolean;
}

interface Subject {
  name: string;
  todoList: Todo[];
}
const isViewMode = ref(false);
const subjects = ref<Subject[]>([
  {
    name: "课程示例",
    todoList: [
      {
        name: "示例任务",
        done: false,
      },
    ],
  },
]);
const archives = ref<Array<Array<Subject>>>([])
const confirmArchive = ref(false)

onMounted(() => {
  const subjectsStr = localStorage.getItem("homework.subjects");
  if (subjectsStr) {
    subjects.value = JSON.parse(subjectsStr);
  }

  const archivesStr = localStorage.getItem("homework.archives");
  if (archivesStr) {
    archives.value = JSON.parse(archivesStr);
  }

  window.onunload = () => {
    localStorage.setItem("homework.subjects", JSON.stringify(subjects.value));
    localStorage.setItem("homework.archives", JSON.stringify(archives.value));
  };
})


const addSubject = () => {
  subjects.value.unshift({
    name: "示例课程",
    todoList: [
      {
        name: "示例任务",
        done: false,
      },
    ],
  });
};

const onArchive = () => {

}

const onPrint = () => {
  // Create a <link> element for the print stylesheet
  const link = document.createElement('link');
  link.href = '/print.css'; // Replace with your actual path
  link.rel = 'stylesheet';
  link.media = 'print';

  // Append the <link> to the <head>
  document.head.appendChild(link);

  // Print the specific parts
  window.print();

  // Remove the print stylesheet after printing
  link.parentNode!.removeChild(link);
}
</script>

<template>
  <div>
    <div class="q-pa-md q-gutter-sm">
      <div style="display: flex; gap: 16px">
        <h6 style="margin: 0; line-height: 1.5">
          <span>课程</span>
        </h6>
        <div>
          <q-toggle label="预览模式" v-model="isViewMode" />
        </div>
      </div>
      <div id="top-actions">
        <q-btn
          size="md"
          color="primary"
          icon="add"
          @click="addSubject"
          label="添加课程"
          v-if="!isViewMode"
        />
        <q-btn
          size="md"
          color="white"
          text-color="black" 
          icon="add"
          @click="confirmArchive = true"
          label="归档"
        />
        <q-btn
          size="md"
          color="secondary"
          icon="print"
          @click="onPrint"
          label="打印"
          v-if="isViewMode"
        />
      </div>
      <div v-if="!isViewMode" class="q-pa-md row items-start q-gutter-md">
        <template
          v-for="(subject, subjectIndex) in subjects"
        >
          <q-card dark bordered class="bg-grey-9 my-card text-h6">
            <q-card-section>
              <span>
                <q-input
                  borderless
                  dark
                  filled
                  clearable
                  v-model="subject.name"
                  :dense="true"
                />
              </span>
            </q-card-section>

            <q-separator dark inset />

            <q-card-section
              v-for="(todo, index) in subject.todoList"
            >
              <div style="display: flex; gap: 4px">
                <q-checkbox v-model="todo.done" @change="(e: Event) => todo.done = (e.target  as HTMLInputElement).checked"/>
                <q-input
                  borderless
                  dark
                  filled
                  clearable
                  v-model="todo.name"
                  :dense="true"
                  class="col-9"
                  :readonly="todo.done"
                />
                <span class="col"></span>
                <div class="col-2">
                  <q-btn
                    round
                    size="xs"
                    color="deep-orange"
                    icon="delete"
                    @click="subject.todoList.splice(index, 1)"
                  />
                </div>
              </div>
            </q-card-section>
            <q-separator dark inset />
            <q-card-actions align="right">
              <q-btn
                size="md"
                color="primary"
                icon="add"
                label="添加任务"
                @click="subject.todoList.push({ name: '', done: false })"
              />
              <q-btn
                size="md"
                icon="delete"
                color="deep-orange"
                glossy
                @click="subjects.splice(subjectIndex, 1)"
                label="移除课程"
              />
            </q-card-actions>
          </q-card>
        </template>
      </div>

      <template v-else>
        <div id="preview-content"
          v-for="subject in subjects"
          :key="subject.name"
          class="printable q-pa-md row items-start q-gutter-md"
        >
          <q-card bordered class="my-card text-h6">
            <q-card-section>
              <span class="text-h6">
                {{ subject.name }}
              </span>
            </q-card-section>

            <q-separator inset />

            <q-card-section v-for="todo in subject.todoList" :key="todo.name">
              <div>
                <q-checkbox v-model="todo.done" @change="(e: Event) => todo.done = (e.target as HTMLInputElement).checked" />
                <span class="text-body1">{{ todo.name || "空白的任务" }}</span>
              </div>
            </q-card-section>
          </q-card>
        </div>
      </template>
    </div>
  </div>


    <q-dialog v-model="confirmArchive">
      <q-card>
        <q-card-section class="column items-center">
          <span class="q-ml-sm">此功能暂不支持</span>
          <span class="q-ml-sm">将当前清单归档，完成后，可在归档列表查找和载入已有清单</span>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="取消" color="primary" v-close-popup @click="confirmArchive = true"/>
          <q-btn flat label="继续" color="primary" v-close-popup disable />
        </q-card-actions>
      </q-card>
    </q-dialog>
</template>

<style scoped></style>
