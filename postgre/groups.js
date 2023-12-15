const pgPool = require('./connection');
const bcrypt = require('bcrypt');


const sql = {
    INSERT_GROUPS: 'INSERT INTO groups (owner_id, group_name) VALUES ($1, $2)',
    SELECT_GROUPS: 'SELECT * FROM groups',
    CHECK_GROUPS: 'SELECT * FROM groups WHERE group_name = $1',
    DELETE_GROUPS: 'DELETE FROM groups WHERE group_name = $1',

    INSERT_GROUPMEMBERS: 'INSERT INTO group_members (group_id, member_id) VALUES ($1, $2)',
    SELECT_GROUPMEMBERS: 'SELECT * FROM group_members WHERE group_id = $1',
    DELETE_GROUPMEMBERS: 'DELETE FROM group_members WHERE (group_id, member_id) = ($1, $2)',
}

async function getGroups() {
    const result = await pgPool.query(sql.SELECT_GROUPS);
    console.log(result.rows);
}

async function addGroups(owner_id, group_name) {
    
    await pgPool.query(sql.INSERT_GROUPS, [owner_id, group_name]);
  }


async function checkGroups(group_name) {
    try {
      const result = await pgPool.query(sql.CHECK_GROUPS, [group_name]);
  
      if (result.rows.length > 0) {
        const group = result.rows[0];
        const group_name = group.group_name;
  
        return { group_name: group.group_name };
      }
      
      return null;
    } catch (error) {
      console.error('Error checking account:', error);
      throw error;
    }
  }


async function deleteGroups(group_name) {
    try {
      const result = await pgPool.query(sql.DELETE_GROUPS, [group_name]);
  
      if (result.rows.length > 0) {
        const group = result.rows[0];
        const group_name = group.group_name;
  
        return { group_name: group.group_name };
      }
      
      return null;
    } catch (error) {
      console.error('Error checking account:', error);
      throw error;
    }
  }

  async function addGroupMembers(group_id, member_id) {

    await pgPool.query(sql.INSERT_GROUPMEMBERS, [group_id, member_id]);
    };

    async function getGroupMembers(group_id) {
        const result = await pgPool.query(sql.SELECT_GROUPMEMBERS, [group_id]);
        console.log(result.rows);
    };

    async function deleteGroupMembers(group_id, member_id) {
        try {
          const result = await pgPool.query(sql.DELETE_GROUPMEMBERS, [group_id, member_id]);
      
          if (result.rows.length > 0) {
            const group = result.rows[0];
            const group_name = group.group_name;
      
            return { group_name: group.group_name };
          }
          
          return null;
        } catch (error) {
          console.error('Error checking account:', error);
          throw error;
        }
      };

    module.exports = {
        addGroups,
        checkGroups,
        getGroups,
        deleteGroups,

        addGroupMembers,
        getGroupMembers,
        deleteGroupMembers,
    };
