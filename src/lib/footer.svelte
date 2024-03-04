<script>
    import { Footer, FooterCopyright, FooterLinkGroup, FooterLink, P, FooterIcon } from 'flowbite-svelte';
    import { FacebookSolid, GithubSolid, DiscordSolid, TwitterSolid } from 'flowbite-svelte-icons';
</script>

<Footer footerType="socialmedia" class="bg-dark-800 text-white">
    <div class="md:flex md:justify-between">
        <div class="md:w-1/2">
            <P class="text-white font-bold text-xl md:mx-4">Workout Plan</P>
        </div>
        <div class="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3 md:w-1/2">
            <div>
                <h2 class="mb-6 text-sm font-semibold text-white uppercase dark:text-white">Resources</h2>
                <FooterLinkGroup>
                    <FooterLink liClass="mb-4" href="/">Flowbite</FooterLink>
                    <FooterLink liClass="mb-4" href="/">Tailwind CSS</FooterLink>
                </FooterLinkGroup>
            </div>
            <div>
                <h2 class="mb-6 text-sm font-semibold uppercase text-white dark:text-white">Follow us</h2>
                <FooterLinkGroup>
                    <FooterLink liClass="mb-4" href="/">GitHub</FooterLink>
                    <FooterLink liClass="mb-4" href="/">Discord</FooterLink>
                </FooterLinkGroup>
            </div>
            <div>
                <h2 class="mb-6 text-sm font-semibold uppercase text-white dark:text-white">Legal</h2>
                <FooterLinkGroup>
                    <FooterLink liClass="mb-4" href="/">Privacy Policy</FooterLink>
                    <FooterLink liClass="mb-4" href="/">Terms & Conditions</FooterLink>
                </FooterLinkGroup>
            </div>
        </div>
    </div>
    <hr class="my-6 border-gray-200 sm:mx-auto dark:border-gray-500 lg:my-8" />
    <div class="sm:flex sm:items-center sm:justify-between">
        <FooterCopyright href="/" by="Flowbite™" />
        <div class="flex mt-4 space-x-6 rtl:space-x-reverse sm:justify-center sm:mt-0">
            <FooterIcon href="/">
                <FacebookSolid class="w-4 h-4 text-gray-300 dark:text-gray-300 hover:text-white dark:hover:text-white" />
            </FooterIcon>
            <FooterIcon href="/">
                <DiscordSolid class="w-4 h-4 text-gray-300 dark:text-gray-300 hover:text-white dark:hover:text-white" />
            </FooterIcon>
            <FooterIcon href="/">
                <TwitterSolid class="w-4 h-4 text-gray-300 dark:text-gray-300 hover:text-white dark:hover:text-white" />
            </FooterIcon>
            <FooterIcon href="/">
                <GithubSolid class="w-4 h-4 text-gray-300 dark:text-gray-300 hover:text-white dark:hover:text-white" />
            </FooterIcon>
        </div>
    </div>
</Footer>
