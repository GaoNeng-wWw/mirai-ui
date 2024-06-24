import { ref, unref } from 'vue';

export const useDisclosure = (
  defaultOpen = false
) => {
  const open = ref(unref(defaultOpen));
  const onOpen = () => open.value = true;
  const onClose = () => open.value = false;
  const onToggle = () => open.value = !open.value;
  return {
    open,
    onOpen,
    onClose,
    onToggle
  };
};