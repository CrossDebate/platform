import React from 'react';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

// Props: steps = array of { label: string, onClick?: function, isCurrent?: boolean }
// Exemplo de uso:
// <WorkflowBreadcrumbs steps={[
//   { label: 'Início', onClick: () => ... },
//   { label: 'Preparação de Dados', onClick: () => ... },
//   { label: 'Análise Exploratória' },
//   { label: 'ANOVA', isCurrent: true }
// ]} />

const MAX_VISIBLE = 4; // Truncamento inteligente para telas pequenas

const WorkflowBreadcrumbs = ({ steps }) => {
  if (!steps || steps.length === 0) return null;
  let displaySteps = steps;
  let truncated = false;
  if (steps.length > MAX_VISIBLE) {
    displaySteps = [
      steps[0],
      { label: '...', isTruncated: true },
      ...steps.slice(- (MAX_VISIBLE - 2))
    ];
    truncated = true;
  }
  return (
    <nav aria-label="breadcrumb">
      <Breadcrumbs
        separator={<NavigateNextIcon fontSize="small" />}
        aria-label="breadcrumb"
        sx={{
          fontSize: { xs: '0.9rem', sm: '1rem' },
          maxWidth: '100%',
          overflowX: 'auto',
          whiteSpace: 'nowrap',
        }}
      >
        {displaySteps.map((step, idx) => {
          if (step.isTruncated) {
            return <Typography key={idx} color="text.secondary">...</Typography>;
          }
          if (step.isCurrent || idx === displaySteps.length - 1) {
            return (
              <Typography key={idx} color="primary" aria-current="page" fontWeight="bold">
                {step.label}
              </Typography>
            );
          }
          return (
            <Link
              key={idx}
              color="inherit"
              underline="hover"
              onClick={step.onClick}
              tabIndex={0}
              sx={{ cursor: step.onClick ? 'pointer' : 'default' }}
              aria-label={`Ir para etapa ${step.label}`}
            >
              {step.label}
            </Link>
          );
        })}
      </Breadcrumbs>
    </nav>
  );
};

export default WorkflowBreadcrumbs;
