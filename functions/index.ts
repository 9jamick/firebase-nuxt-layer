import * as functions from 'firebase-functions/v1';
import * as admin from 'firebase-admin';

admin.initializeApp();

interface User {
  name: string;
  email: string;
  updatedAt?: number;
}

interface Contact {
  type: string;
  value: string;
}

interface UserWithContacts extends User {
  id: string;
  contacts: Array<Contact & { id: string }>;
  contactCount: number;
  updatedAt?: number;
}

export const addUserTimestamp = functions.database.ref('/users/{userId}')
  .onWrite(async (change: functions.Change<functions.database.DataSnapshot>, context: functions.EventContext) => {
    const userId = context.params.userId as string;
    const userRef = admin.database().ref(`/users/${userId}`);
    
    if (change.after.exists()) {
      const snapshot = await userRef.once('value');
      const userData = snapshot.val() as User;
      
      if (!userData.updatedAt || userData.updatedAt < Date.now() - 1000) {
        return userRef.update({
          updatedAt: Date.now()
        });
      }
    }
    
    return null;
  });

export const getUsersWithContacts = functions.https.onCall(async (data: any, context: functions.https.CallableContext) => {
  try {
    const usersSnapshot = await admin.database().ref('/users').once('value');
    const users = usersSnapshot.val() as Record<string, User> || {};
    
    const result: UserWithContacts[] = [];
    
    for (const userId in users) {
      const user = users[userId];
      
      const contactsSnapshot = await admin.database()
        .ref(`/users/${userId}/contacts`)
        .once('value');
      const contacts = contactsSnapshot.val() as Record<string, Contact> || {};
      
      const contactsArray = Object.keys(contacts).map(cid => ({
        id: cid,
        ...contacts[cid]
      }));
      
      result.push({
        id: userId,
        name: user.name,
        email: user.email,
        updatedAt: user.updatedAt,
        contacts: contactsArray,
        contactCount: contactsArray.length
      });
    }
    
    return {
      success: true,
      users: result,
      totalUsers: result.length,
      timestamp: Date.now()
    };
  } catch (error) {
    console.error('Error getting users with contacts:', error);
    throw new functions.https.HttpsError('internal', 'Failed to fetch users with contacts');
  }
});

export const getUsersWithContactsHttp = functions.https.onRequest(async (req: functions.https.Request, res: functions.Response) => {
  try {
    const usersSnapshot = await admin.database().ref('/users').once('value');
    const users = usersSnapshot.val() as Record<string, User> || {};
    
    const result: UserWithContacts[] = [];
    
    for (const userId in users) {
      const user = users[userId];
      
      const contactsSnapshot = await admin.database()
        .ref(`/users/${userId}/contacts`)
        .once('value');
      const contacts = contactsSnapshot.val() as Record<string, Contact> || {};
      
      const contactsArray = Object.keys(contacts).map(cid => ({
        id: cid,
        ...contacts[cid]
      }));
      
      result.push({
        id: userId,
        name: user.name,
        email: user.email,
        updatedAt: user.updatedAt,
        contacts: contactsArray,
        contactCount: contactsArray.length
      });
    }
    
    res.json({
      success: true,
      users: result,
      totalUsers: result.length,
      timestamp: Date.now()
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error' 
    });
  }
});
