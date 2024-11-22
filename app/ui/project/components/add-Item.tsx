'use client'
import React, { useState } from 'react';
import { TextField, Button, MenuItem, Typography, Box, Popper, Stack } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

export default function AddItemForm() {
  const [formData, setFormData] = useState({
    description: '',
    quantity: '',
    unit: '',
    unitValue: '0.0',
    discount: '0',
    date: '',
    type: '',
    projectName: '',
  });
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [anchorEl2, setAnchorEl2] = React.useState<null | HTMLElement>(null);

  const handlePopperClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const handlePopperClick2 = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl2(anchorEl2 ? null : event.currentTarget);
  };

  const open = Boolean(anchorEl);
  const open2 = Boolean(anchorEl2);
  const id = open ? 'project-popper' : undefined;
  const id2 = open2 ? 'type-popper2' : undefined;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Add form submission logic here (e.g., API call)
  };

  return (
    <Box sx={{ padding: 4, maxWidth: 600, margin: '0 auto' }}>
      <Typography variant="h4" gutterBottom>
        Add Item
      </Typography>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <TextField
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
        />
      <Box sx={{ display: 'flex', gap: 2 }}>
      <TextField
          select
          label="Project Name"
          name="projectName"
          value={formData.projectName}
          onChange={handleChange}
          fullWidth
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value="project1">Project 1</MenuItem>
          <MenuItem value="project2">Project 2</MenuItem>
          <MenuItem value="project3">Project 3</MenuItem>
        </TextField>
          <Button aria-describedby={id} variant="outlined" onClick={handlePopperClick}><AddIcon /></Button>
          <Popper id={id} open={open} anchorEl={anchorEl} sx={{ zIndex: 1200 }} placement='right'>
            <Box sx={{ border: 1, p: 1, bgcolor: 'background.paper', marginLeft: '2em' }}>
            <Stack spacing={2}>
            <TextField
              label="Popper Project Name"
              name="projectName"
              fullWidth
              >
            </TextField>
            <TextField
              label="Popper Project Description"
              name="projectDescription"
              fullWidth
              >
            </TextField>
            <TextField
              select
              fullWidth
              label="Popper Project Type"
              name="type"
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value="type1">Popper Project Type 1</MenuItem>
              <MenuItem value="type2">Popper Project Type 2</MenuItem>
              <MenuItem value="type3">Popper Project Type 3</MenuItem>
            </TextField>
            <Box sx={{ display: 'flex', gap: 2, marginLeft: 'auto' }}>
              <Button id="projectTypeCancelButton" variant="outlined" color="error">Cancel</Button>
              <Button id="projectTypeSaveButton" variant="contained">Save</Button>
            </Box>
            </Stack>
            </Box>
          </Popper>
      </Box>
        <TextField
          fullWidth
          label="Description"
          name="description"
          value={formData.description}
          multiline
          onChange={handleChange}
          maxRows={4}
        />
        <Box sx={{ display: 'flex', gap: 2 }}>
        <TextField
          select
          fullWidth
          label="Type"
          name="type"
          value={formData.type}
          onChange={handleChange}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value="type1">Type 1</MenuItem>
          <MenuItem value="type2">Type 2</MenuItem>
          <MenuItem value="type3">Type 3</MenuItem>
        </TextField>
        <Button aria-describedby={id2} variant="outlined" onClick={handlePopperClick2}><AddIcon /></Button>
          <Popper id={id2} open={open2} anchorEl={anchorEl2} sx={{ zIndex: 1200 }} placement='right'>
            <Box sx={{ border: 1, p: 1, bgcolor: 'background.paper', marginLeft: '2em' }}>
              <Stack spacing={2}>
                <TextField
                  label="Popper Type Name"
                  name="popperTypeName"
                  fullWidth
                  >
                </TextField>
                <Box sx={{ display: 'flex', gap: 2, marginLeft: 'auto' }}>
                  <Button variant="outlined" color="error" onClick={() =>{ console.log('clicked') }}>Cancel</Button>
                  <Button variant="contained" onClick={() => { console.log('clicked') }}>Save</Button>
                </Box>
              </Stack>
            </Box>
          </Popper>
        </Box>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <TextField
            type="number"
            label="Quantity"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            sx={{ flex: 1 }}
          />
          <TextField
            label="Unit"
            name="unit"
            value={formData.unit}
            onChange={handleChange}
            sx={{ flex: 1 }}
          />
          <TextField
            type="number"
            label="Unit Value"
            name="unitValue"
            value={formData.unitValue}
            onChange={handleChange}
            sx={{ flex: 1 }}
          />
          <TextField
            inputMode={"numeric"}
            label="Discount $"
            name="discount"
            value={formData.discount}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                e.preventDefault();
                // if new value is valid float
                if (/^([\d]*[,.]?[\d]{0,2})$/.test(e.target.value)) {
                  handleChange(e);
                }
            }}
            sx={{ flex: 1 }}
          />
        </Box>
        <Box sx={{ display: 'flex', gap: 2, marginLeft: 'auto' }}>
        <Button
          type="submit"
          variant="outlined"
        >
          Clear
        </Button>
          <Button
            type="submit"
            variant="contained"
            color="primary"
          >
            Save
          </Button>  
        </Box>
      </form>
    </Box>
  );
};