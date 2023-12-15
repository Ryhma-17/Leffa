import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import '../App.js';
import './../styles.css';

const GroupPage = ({ signedIn, setSignedIn }) => {
  const { groupName } = useParams();
  const [groupData, setGroupData] = useState(null);
  const [newGroupName, setNewGroupName] = useState('');

  useEffect(() => {
    fetchGroupData();
  }, [groupName]);

  const fetchGroupData = async () => {
    try {
      const response = await fetch(`/groups/${groupName}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
      });
      if (response.ok) {
        const data = await response.json();
        setGroupData(data);
      } else {
        console.error('Error fetching group data:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching group data:', error);
    }
  };

  const createGroup = async () => {
    // Tällä funktiolla voidaan luoda uusi ryhmä
    const response = await fetch('http://localhost:3001/groups/', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ group_name: newGroupName, owner_id: localStorage.getItem('username') }),
    });

    if (response.ok) {
      // Uuden ryhmän luonti onnistui
      const data = await response.json();
      console.log('New group created:', data);
      // Päivittää jäsenyyden tilan
      setGroupData(data);
 
    } else {
      // Uuden ryhmän luonti epäonnistui
      const errorData = await response.json();
      console.error('Failed to create new group:', errorData.error);
    }
  };

  const handleViewGroup = () => {
    // Handle the action to view the group
    console.log('Viewing group:', groupData);
  };

  return (
    <div className="Groupscontainer">
      {signedIn ? (
        <div>
          <h1>{groupName} Group Page</h1>
          <div className="Groups">
            <button onClick={handleViewGroup}>View Group</button>

            <label htmlFor="newGroupName">Enter Group Name:</label>
            <input
              type="text"
              id="newGroupName"
              value={newGroupName}
              onChange={(e) => setNewGroupName(e.target.value)}
            />
            <button onClick={createGroup}>Create New Group</button>
          </div>
        </div>
      ) : (
        <div>
          <p>You are not signed in.</p>
          <p>Please sign in to view this page.</p>
        </div>
      )}
    </div>
  );
};

export default GroupPage;
