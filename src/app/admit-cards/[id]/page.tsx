'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { CircularProgress, Container, Paper, Typography, Box, Divider, Grid, Chip, IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Navbar from "../../../components/Header";
import Footer from "../../../components/Footer";
interface AdmitCard {
  _id: string;
  title: string;
  description: string;
  issueDate: string;
  organization: string;
  category: string;
  status: string;
  downloadLink?: string;
}

export default function AdmitCardDetails() {
  const params = useParams() as { id: string };
  const router = useRouter();
  const [admitCard, setAdmitCard] = useState<AdmitCard | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { id } = params;

  useEffect(() => {
    const fetchAdmitCard = async () => {
       try {
        const response = await fetch(`/api/admit-cards/${params.id}`);
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || 'Failed to fetch admit card');
        }

        setAdmitCard(data.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchAdmitCard();
    }
  }, [id]);

  if (loading) {
    return (
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Box sx={{ mb: 2 }}>
          <IconButton
            onClick={() => router.back()}
            sx={{ color: 'text.secondary', '&:hover': { color: 'primary.main' } }}
          >
            <ArrowBackIcon />
          </IconButton>
        </Box>
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="50vh">
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Box sx={{ mb: 2 }}>
          <IconButton
            onClick={() => router.back()}
            sx={{ color: 'text.secondary', '&:hover': { color: 'primary.main' } }}
          >
            <ArrowBackIcon />
          </IconButton>
        </Box>
        <Paper sx={{ p: 3, backgroundColor: '#ffebee' }}>
          <Typography color="error" variant="h6" gutterBottom>
            Error
          </Typography>
          <Typography>{error}</Typography>
        </Paper>
      </Container>
    );
  }

  if (!admitCard) {
    return (
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Box sx={{ mb: 2 }}>
          <IconButton
            onClick={() => router.back()}
            sx={{ color: 'text.secondary', '&:hover': { color: 'primary.main' } }}
          >
            <ArrowBackIcon />
          </IconButton>
        </Box>
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6">Admit card not found</Typography>
        </Paper>
      </Container>
    );
  }

  return (
    <>
    <Navbar />
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Box sx={{ mb: 2 }}>
        <IconButton
          onClick={() => router.back()}
          sx={{ color: 'text.secondary', '&:hover': { color: 'primary.main' } }}
        >
          <ArrowBackIcon />
        </IconButton>
      </Box>
      <Paper sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom sx={{ color: 'primary.main' }}>
          {admitCard.title}
        </Typography>
        <Divider sx={{ my: 2 }} />
        
        <Grid container spacing={3} sx={{ mb: 3 }}>
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle2" color="text.secondary">Organization</Typography>
            <Typography variant="body1">{admitCard.organization}</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle2" color="text.secondary">Category</Typography>
            <Typography variant="body1">{admitCard.category}</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle2" color="text.secondary">Status</Typography>
            <Chip
              label={admitCard.status}
              color={admitCard.status.toLowerCase() === 'published' ? 'success' : 'default'}
              size="small"
              sx={{ mt: 0.5 }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle2" color="text.secondary">Issue Date</Typography>
            <Typography variant="body1">{new Date(admitCard.issueDate).toLocaleDateString()}</Typography>
          </Grid>
        </Grid>

        <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
          Description
        </Typography>
        <Typography variant="body1" paragraph sx={{ mb: 3 }}>
          {admitCard.description}
        </Typography>

        {admitCard.downloadLink && (
          <Box sx={{ mt: 3 }}>
            <a
              href={admitCard.downloadLink}
              target="_blank"
              rel="noopener noreferrer"
              style={{ textDecoration: 'none' }}
            >
              <Chip
                label="Download Admit Card"
                color="primary"
                clickable
                sx={{ '&:hover': { backgroundColor: 'primary.dark' } }}
              />
            </a>
          </Box>
        )}
      </Paper>
    </Container>
    <Footer />
    </>
  );
}