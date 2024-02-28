<script lang="ts">import { Section } from "flowbite-svelte-blocks";
    import { Label, Input, Button, Select, Textarea } from "flowbite-svelte";
    const handleSubmit = () => {
      alert("Form submited.");
    };
    let selected;
    let countries = [
      { value: "tv", name: "TV/Monitors" },
      { value: "pc", name: "PC" },
      { value: "phone", name: "Phones" }
    ];
    </script>
    
    