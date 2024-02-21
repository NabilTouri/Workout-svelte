<script>
    import { Card } from 'flowbite-svelte';
    import { ClipboardListOutline, CalendarMonthOutline, RocketOutline, UserOutline } from 'flowbite-svelte-icons';
</script>
  
<div class="min-h-screen flex items-center">
  <div class="grid gap-4 grid-cols-4 mx-auto max-w-screen-xl">
    <a href="/">
      <Card>
        <ClipboardListOutline class="w-7 h-7 mb-3 text-gray-500 dark:text-gray-400" />
        <h5 class="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">Set your goals</h5>
        <p class="mb-3 font-normal text-gray-500 dark:text-gray-400">Take charge of your fitness journey by setting concrete goals that inspire and motivate you to succeed:</p>
      </Card>
    </a>

    <a href="/plane">
      <Card>
        <CalendarMonthOutline class="w-7 h-7 mb-3 text-gray-500 dark:text-gray-400" />
        <h5 class="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">Your Workout Plan</h5>
        <p class="mb-3 font-normal text-gray-500 dark:text-gray-400">Here you have the freedom to design a workout routine tailored to your fitness goals and preferences, empowering you to take control of your fitness journey:</p>
      </Card>
    </a>

    <a href="/">
      <Card>
        <RocketOutline class="w-7 h-7 mb-3 text-gray-500 dark:text-gray-400" />
        <h5 class="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">Start training!</h5>
        <p class="mb-3 font-normal text-gray-500 dark:text-gray-400">Keep tabs on your progress and elevate every session with ease:</p>
      </Card>
    </a>

    <a href="/">
      <Card>
        <UserOutline class="w-7 h-7 mb-3 text-gray-500 dark:text-gray-400" />
        <h5 class="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">Check your results</h5>
        <p class="mb-3 font-normal text-gray-500 dark:text-gray-400">Explore your progress, celebrate achievements, and stay motivated on your fitness path:</p>
      </Card>
    </a>
</div>
</div>
