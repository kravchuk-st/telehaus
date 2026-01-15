const getData = async () => {
  try {
    const res = await fetch(`../assets/data/data.json`);

    if (res.ok) {
      const data = await res.json();
      return data;
    }
  } catch (err) {
    console.error('Помилка:', err);
  }
};
