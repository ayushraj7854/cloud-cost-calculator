const users = []; // In-memory storage for demo

const UserModel = {
    create: function(userData) {
        const user = {
            id: Date.now().toString(),
            email: userData.email,
            name: userData.name,
            createdAt: new Date(),
            lastLogin: null,
            preferences: {
                defaultRegion: 'us-east-1',
                defaultProvider: 'aws',
                currency: 'USD',
                theme: 'light'
            }
        };

        // Add any additional userData
        for (let key in userData) {
            if (userData.hasOwnProperty(key)) {
                user[key] = userData[key];
            }
        }

        users.push(user);
        return user;
    },

    findById: function(id) {
        for (let i = 0; i < users.length; i++) {
            if (users[i].id === id) {
                return users[i];
            }
        }
        return null;
    },

    findByEmail: function(email) {
        for (let i = 0; i < users.length; i++) {
            if (users[i].email === email) {
                return users[i];
            }
        }
        return null;
    },

    update: function(id, updates) {
        for (let i = 0; i < users.length; i++) {
            if (users[i].id === id) {
                // Update user properties
                for (let key in updates) {
                    if (updates.hasOwnProperty(key)) {
                        users[i][key] = updates[key];
                    }
                }
                users[i].updatedAt = new Date();
                return users[i];
            }
        }
        return null;
    },

    updatePreferences: function(id, preferences) {
        const user = this.findById(id);
        if (!user) return null;

        // Update preferences
        for (let key in preferences) {
            if (preferences.hasOwnProperty(key)) {
                user.preferences[key] = preferences[key];
            }
        }

        return this.update(id, { preferences: user.preferences });
    },

    delete: function(id) {
        for (let i = 0; i < users.length; i++) {
            if (users[i].id === id) {
                users.splice(i, 1);
                return true;
            }
        }
        return false;
    },

    getAll: function() {
        return users;
    }
};

module.exports = UserModel;