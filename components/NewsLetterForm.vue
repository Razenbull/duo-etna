<template>
    <form class="w-full max-w-md">

        <!-- Text -->
        <p class="mt-1 md:mt-8 text-white mx-auto md:mx-0 max-w-md hidden md:block">
            Get the latest news from Duo Etna,<br>
            subscribe to our news letter
        </p>

        <div class="flex flex-col md:flex-row items-center py-2 px-5 md:px-0 mt-3 md:mt-0">
            
            <!-- input email -->
            <input class="bg-white border-2 border-white w-full text-gray-700 md:mr-3 mb-3 md:mb-0 py-3 px-3 leading-tight focus:outline-none" type="email" placeholder="Your email goes here !" aria-label="Email">

            <!-- submit email -->
            <button class="flex-shrink-0 uppercase font-bold px-6 py-3 border-2 rounded border-green text-green focus:outline-none" type="button">
                Subscribe
            </button>

        </div>
    </form>
</template>

<script>
export default {
}
</script>

<style>

</style>