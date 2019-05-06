import React from 'react';
import { createStyles } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/core';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const styles = createStyles({
  root: { width: '100%' },
});

function SimpleExpansionPanel(props: any) {
  const { classes, location } = props;

  return (
    <div className={classes.root}>
      <ExpansionPanel>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>{location.name}</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <p>{location.address}</p>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </div>
  );
}

export default withStyles(styles)(SimpleExpansionPanel);
