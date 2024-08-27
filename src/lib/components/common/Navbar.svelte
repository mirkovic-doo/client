<script>
  import { goto } from '$app/navigation';
  import { auth } from '$lib/auth/firebase';
  import Notifications from '$lib/components/notifications/Notifications.svelte';
  import userStore from '$lib/stores/userStore';
  import { signOut } from 'firebase/auth';
  import {
    Avatar,
    Dropdown,
    DropdownDivider,
    DropdownHeader,
    DropdownItem,
    Navbar,
    NavBrand,
    NavLi,
    NavUl,
  } from 'flowbite-svelte';

  const handleLogOut = async () => {
    try {
      $userStore = null;
      await signOut(auth);
    } catch (e) {
      console.log(e);
    }
  };
</script>

<Navbar class="!bg-light-gray border-b dark:border-grayscale-800 sticky top-0 z-[99]">
  <NavBrand href="/">
    <span class="self-center whitespace-nowrap text-xl font-semibold text-white">Buk It Easy</span>
  </NavBrand>
  <div class="flex items-center md:order-2 gap-4">
    <Notifications />
    <Avatar id="avatar-menu" class="cursor-pointer !bg-grayscale-800"
      >{$userStore?.firstName[0]}{$userStore?.lastName[0]}</Avatar
    >
  </div>
  <Dropdown
    placement="bottom-start"
    triggeredBy="#avatar-menu"
    class="min-w-52 bg-grayscale-800 rounded border-grayscale-800"
  >
    <DropdownHeader>
      <span class="block text-sm">{$userStore?.firstName} {$userStore?.lastName}</span>
      <span class="block truncate text-sm font-medium">{$userStore?.email}</span>
    </DropdownHeader>
    <DropdownItem on:click={() => goto('/user/profile')}>Profile</DropdownItem>
    <DropdownDivider />
    <DropdownItem on:click={handleLogOut}>Sign out</DropdownItem>
  </Dropdown>
  <NavUl>
    <NavLi href="/" active={true}>Home</NavLi>
    <NavLi href="/reservations">Reservations</NavLi>
    <NavLi href="/docs/components/navbar">Example 2</NavLi>
  </NavUl>
</Navbar>
