<template>
    <div class="grid grid-cols-1 gap-4">
        <div class="col-span-1">
            <BaseCard>
                <template #title>Importer un fichier mp3</template>

                <template #body>
                    <form @submit.prevent="submitPost" enctype="multipart/form-data" class="grid grid-cols-1 gap-3">
                        <div class="col-span-1">
                            <label class="form-label">Fichier audio</label>
                            <BaseUploadFile accept="mp3/*" @upload="handleFileUpload" />
                        </div>

                        <div class="col-span-1">
                            <BaseButton primary :loading="loading">Importer</BaseButton>
                        </div>
                    </form>
                </template>
            </BaseCard>
        </div>
    </div>
</template>

<script lang="ts" setup>
const { showMessage } = useNotification()

const loading = ref(false)
const file = ref<File | null>(null)

const handleFileUpload = (fileUpload: File) => (file.value = fileUpload)

const submitPost = async () => {
    if (loading.value || !file.value) return

    try {
        loading.value = true

        const formData = new FormData()
        formData.append('file', file.value)

        await useApiFetch('/api/v1/admin/upload-mp3', { body: formData, method: 'POST', headers: { 'Content-Type': 'multipart/form-data' } })

        showMessage({
            message: 'Votre fichier a été ajouté ! ',
            success: true,
        })
    } catch (e) {
        console.error(e)
    }

    loading.value = false
}
</script>
