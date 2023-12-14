import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
//import { useHistory } from 'react-router-dom';
import '../App.js';
import './styles.css';

const GroupPage = ({ signedIn, setSignedIn }) => {
  const { groupName } = useParams();
  const [groupData, setGroupData] = useState(null);
  const [isMember, setIsMember] = useState(false);
  const [isOwner, setIsOwner] = useState(false);
  const [membershipRequestSent, setMembershipRequestSent] = useState(false);
  const [allGroups] = useState([]);
  //const history = useHistory();

  useEffect(() => {
    // Pyyntö palvelimelle saadaksesi ryhmän tiedot ja jäsenyyden tilan
    // Voit myös selvittää, onko käyttäjä ryhmän omistaja
    fetch(`http://localhost:3001/groups/${groupName}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(data => {
        setGroupData(data);
        setIsMember(data.members.includes(localStorage.getItem('username')));
        setIsOwner(data.owner === localStorage.getItem('username'));
      })
      .catch(error => console.error('Error fetching group data:', error));

  }, [groupName]);

  const createGroup = async () => {
    // Tällä funktiolla voidaan luoda uusi ryhmä
    const response = await fetch('http://localhost:3001/groups', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: 'UusiRyhmä', description: 'Ryhmän kuvaus' }),
    });

    if (response.ok) {
      // Uuden ryhmän luonti onnistui
      const data = await response.json();
      console.log('New group created:', data);
      // Päivittää jäsenyyden tilan
      setGroupData(data);
      setIsMember(true);
      setIsOwner(true);
    } else {
      // Uuden ryhmän luonti epäonnistui
      const errorData = await response.json();
      console.error('Failed to create new group:', errorData.error);
    }
  };

  const handleRemoveMember = async (memberUsername) => {
    // Tällä funktiolla voidaan poistaa jäseniä ryhmästä
    const response = await fetch(`http://localhost:3001/groups/${groupName}/members/${memberUsername}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
    });

    if (response.ok) {
      // Jäsenen poisto onnistui
      const updatedGroupData = { ...groupData };
      updatedGroupData.members = updatedGroupData.members.filter(member => member !== memberUsername);
      setGroupData(updatedGroupData);
    } else {
      // Jäsenen poisto epäonnistui
      const errorData = await response.json();
      console.error('Failed to remove member:', errorData.error);
    }
  };

  const sendMembershipRequest = async () => {
    // Lähetä pyyntö liittyä ryhmään
    const response = await fetch(`http://localhost:3001/groups/${groupName}/join-request`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
    });

    if (response.ok) {
      // Liittymispyynnön lähettäminen onnistui
      setMembershipRequestSent(true);
    } else {
      // Liittymispyynnön lähettäminen epäonnistui
      const errorData = await response.json();
      console.error('Failed to send membership request:', errorData.error);
    }
  };

  const handleAcceptRequest = async (requestingUsername) => {
    // Hyväksy liittymispyyntö ryhmän omistajalta
    const response = await fetch(`http://localhost:3001/groups/${groupName}/accept-request/${requestingUsername}`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
    });

    if (response.ok) {
      // Liittymispyynnön hyväksyminen onnistui
      const updatedGroupData = { ...groupData };
      updatedGroupData.members.push(requestingUsername);
      setGroupData(updatedGroupData);
    } else {
      // Liittymispyynnön hyväksyminen epäonnistui
      const errorData = await response.json();
      console.error('Failed to accept membership request:', errorData.error);
    }
  };

  const handleViewGroup = () => {
    // Voit käyttää tätä funktiota siirtyäksesi ryhmän näkymään
   // history.push(`/groups/${groupName}`);
  };

  return (
    <div className = "Groupscontainer">
      {signedIn ? (
        <div>
          <h1>{groupName} Group Page</h1>
          {groupData ? (
            <div>
              {isMember ? (
                <div>
                  {/* Näytä ryhmän tiedot */}
                  <button onClick={handleViewGroup}>View Group</button>
                  {isOwner && (
                    // Näytä poista jäsen -painike, jos käyttäjä on ryhmän omistaja
                    <button onClick={() => handleRemoveMember(localStorage.getItem('username'))}>
                      Remove Me from Group
                    </button>
                  )}
                </div>
              ) : (
                <div>
                  {membershipRequestSent ? (
                    <p>Membership request sent. Waiting for approval.</p>
                  ) : (
                    <div>
                      <button onClick={sendMembershipRequest}>Join Group</button>
                    </div>
                  )}
                </div>
              )}
            </div>
          ) : (
            <p>Loading group data...</p>
          )}
          <button onClick={createGroup}>Create New Group</button>
        </div>
      ) : (
        <div>
          <h1>All Groups</h1>
          <button type= "button" onClick = {() => setSignedIn(true)}>joo</button>
          {allGroups.map(group => (
            <div key={group.name}>
              <h2>{group.name}</h2>
              <p>{group.description}</p>
              <Link to={`/groups/${group.name}`}>View Group</Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default GroupPage;

