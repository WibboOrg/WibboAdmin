<template>
    <div class="grid grid-cols-1 gap-4">
        <div class="col-span-1">
            <BaseCard>
                <template #title>Crée un article</template>

                <template #body>
                    <form @submit.prevent="submitPost" class="grid grid-cols-1 gap-3 md:grid-cols-2">
                        <div class="col-span-1">
                            <label class="form-label">Titre</label>
                            <BaseInput v-model="postForm.title" />
                        </div>

                        <div class="col-span-1">
                            <label class="form-label">Description</label>
                            <BaseInput v-model="postForm.desc" />
                        </div>

                        <div class="col-span-1">
                            <label class="form-label">Url image</label>
                            <BaseInput v-model="postForm.url" />
                        </div>

                        <div class="col-span-1">
                            <label class="form-label">Mot clé (séparer par des -)</label>
                            <BaseInput v-model="postForm.keyword" />
                        </div>

                        <div class="col-span-full">
                            <label class="form-label">Article</label>
                            <Editor
                                v-model="postForm.content"
                                api-key="ekl3p5i26efg7nz3rtnyh3oqj1hx9pfuile50yz68bum3wy7"
                                :init="{
                                    height: 500,
                                    menubar: true,
                                    plugins: [
                                        'print preview fullpage searchreplace autolink directionality visualblocks visualchars fullscreen image link media \
										template codesample table charmap hr pagebreak nonbreaking anchor insertdatetime advlist lists wordcount \
										imagetools textpattern',
                                    ],
                                    toolbar:
                                        'formatselect | bold italic strikethrough forecolor backcolor | link | alignleft aligncenter alignright alignjustify \
										| numlist bullist outdent indent | removeformat',
                                    language: 'fr_FR',
                                }"
                            />
                        </div>

                        <div class="col-span-1">
                            <label class="form-label">Rédacteur</label>
                            <BaseInput v-model="postForm.author" />
                        </div>

                        <div class="col-span-1">
                            <label class="form-label">Date de publication</label>
                            <BaseInput type="datetime-local" v-model="postForm.time" />
                        </div>

                        <div class="col-span-full">
                            <BaseButton primary :loading="loading">Ajouter</BaseButton>
                        </div>
                    </form>
                </template>
            </BaseCard>
        </div>
    </div>
</template>

<script lang="ts" setup>
import Editor from '@tinymce/tinymce-vue'

const { showMessage } = useNotification()

const loading = ref(false)
const postForm = ref({ title: '', desc: '', url: '', content: '', author: '', keyword: '', time: '' })

const submitPost = async () => {
    if (loading.value) return

    try {
        loading.value = true

        await useApiFetch('/api/v1/admin/article', { body: postForm.value, method: 'POST' })

        showMessage({
            message: "L'article est publié !",
            success: true,
        })

        postForm.value = { title: '', desc: '', url: '', content: '', author: '', keyword: '', time: '' }
    } catch (e) {
        console.error(e)
    }

    loading.value = false
}
</script>
