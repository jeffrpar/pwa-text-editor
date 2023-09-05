import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
// Function to put content into the database
export const putDb = async (content) => {
  console.log('Putting content into the database');

  // Create a connection to the database database and version we want to use.
  const contactDb = await openDB('jate', 1);

  // Create a new transaction and specify the database and data privileges.
  const tx = contactDb.transaction('jate', 'readwrite');

  // Open up the desired object store.
  const store = tx.objectStore('jate');

  try {
    // Add the content to the object store.
    const result = await store.add({ content });

    // Check if the content was successfully added
    if (result) {
      console.log('Content added successfully:', result);
    } else {
      console.error('Failed to add content to the database');
    }
  } catch (error) {
    console.error('Error adding content to the database:', error);
  }
};

// TODO: Add logic for a method that gets all the content from the database
// Export a function we will use to GET to the database.
export const getDb = async () => {
  console.log('GET from the database');

  // Create a connection to the database database and version we want to use.
  const contactDb = await openDB('jate', 1);

  // Create a new transaction and specify the database and data privileges.
  const tx = contactDb.transaction('jate', 'readonly');

  // Open up the desired object store.
  const store = tx.objectStore('jate');

  // Use the .get() method to get data in the database.
  const request = store.get(1);

  // Get confirmation of the request.
  const result = await request;
  console.log('result.value', result);
  return result?.value;
};

initdb();
