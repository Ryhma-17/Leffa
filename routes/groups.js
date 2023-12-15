const router = require('express').Router();
const multer = require('multer');
const upload = multer({ dest: 'upload/' });

const {
  addGroups,
  getGroups,
  checkGroups,
  deleteGroups,
  addGroupMembers,
  getGroupMembers,
  deleteGroupMembers,
  acceptMembershipRequest,
  joinGroup,
} = require('../postgre/groups');

// Get group data for a specific group
router.get('/getgroup', async (req, res) => {
  const { groupName } = req.params;

  try {
    const groupData = await getGroups(groupName);
    res.status(200).json(groupData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

// Create a new group
router.post('/', upload.none(), async (req, res) => {
  const { owner_id, group_name } = req.body;

  // Check if the group already exists
  const existingGroup = await checkGroups(group_name);
  if (existingGroup) {
    return res.status(400).json({ error: 'Group already exists' });
  }

  // Add a new group to the database
  try {
    await addGroups(owner_id, group_name);
    res.status(201).json({ message: 'Group created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

// Add a member to a group
router.post('/:groupName/members', upload.none(), async (req, res) => {
  const { groupName } = req.params;
  const { member_id } = req.body;

  // Add a new group member
  try {
    await addGroupMembers(groupName, member_id);
    res.status(201).json({ message: 'Group member added successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

// Get group members for a specific group
router.get('/:groupName/members', async (req, res) => {
  const { groupName } = req.params;

  // Fetch group members
  try {
    const members = await getGroupMembers(groupName);
    res.status(200).json({ members });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

// Delete a group
router.delete('/', upload.none(), async (req, res) => {
  const { group_name } = req.body;

  // Delete a group
  try {
    await deleteGroups(group_name);
    res.status(201).json({ message: 'Group deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

// Delete a group member
router.delete('/:groupName/members/:member_id', upload.none(), async (req, res) => {
  const { groupName, member_id } = req.params;

  // Delete a group member
  try {
    await deleteGroupMembers(groupName, member_id);
    res.status(201).json({ message: 'Group member deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

// Send membership request to join a group
router.post('/:groupName/join-request', upload.none(), async (req, res) => {
  const { groupName } = req.params;

  // Logic for sending membership request
  try {
    await joinGroup(groupName);
    res.status(201).json({ message: 'Membership request sent successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

// Accept membership request to join a group
router.post('/:groupName/accept-request/:requestingUsername', upload.none(), async (req, res) => {
  const { groupName, requestingUsername } = req.params;

  // Logic for accepting membership request
  try {
    await acceptMembershipRequest(groupName, requestingUsername);
    res.status(201).json({ message: 'Membership request accepted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
