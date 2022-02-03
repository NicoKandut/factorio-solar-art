let updateAvailable = false;

export const getUpdateAvailable = () => updateAvailable;

export const onUpdate = () => (updateAvailable = true);
