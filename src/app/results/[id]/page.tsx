"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  CircularProgress,
  Container,
  Paper,
  Typography,
  Box,
  Divider,
  Grid,
  Chip,
  IconButton,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Navbar from "../../../components/Header";
import Footer from "../../../components/Footer";

interface Result {
  _id: string;
  title: string;
  description: string;
  postDate: string;
  organization: string;
  category: string;
  status: string;
  downloadLink?: string;
  createdAt: string;
  updatedAt: string;
}

export default function ResultDetails() {
  const params = useParams() as { id: string };
  const { id } = params;
  const router = useRouter();
  const [result, setResult] = useState<Result | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchResult = async () => {
      try {
        const response = await fetch(`/api/results/${id}`);
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || "Failed to fetch result");
        }

        setResult(data.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchResult();
    }
  }, [id]);

  if (loading) {
    return (
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Box sx={{ mb: 2 }}>
          <IconButton
            onClick={() => router.back()}
            sx={{
              color: "text.secondary",
              "&:hover": { color: "primary.main" },
            }}
          >
            <ArrowBackIcon />
          </IconButton>
        </Box>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="50vh"
        >
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
            sx={{
              color: "text.secondary",
              "&:hover": { color: "primary.main" },
            }}
          >
            <ArrowBackIcon />
          </IconButton>
        </Box>
        <Paper sx={{ p: 3, backgroundColor: "#ffebee" }}>
          <Typography color="error" variant="h6" gutterBottom>
            Error
          </Typography>
          <Typography>{error}</Typography>
        </Paper>
      </Container>
    );
  }

  if (!result) {
    return (
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Box sx={{ mb: 2 }}>
          <IconButton
            onClick={() => router.back()}
            sx={{
              color: "text.secondary",
              "&:hover": { color: "primary.main" },
            }}
          >
            <ArrowBackIcon />
          </IconButton>
        </Box>
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6">Result not found</Typography>
        </Paper>
      </Container>
    );
  }

  return (
    <>
      <Navbar />
      <div className="max-w-7xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
        <Box sx={{ mb: 2 }}>
          <IconButton
            onClick={() => router.back()}
            sx={{
              color: "text.secondary",
              "&:hover": { color: "primary.main" },
            }}
          >
            <ArrowBackIcon />
          </IconButton>
        </Box>
        <Paper sx={{ p: 4 }}>
          <Typography variant="h4" gutterBottom sx={{ color: "primary.main" }}>
            {result.title}
          </Typography>
          <Divider sx={{ my: 2 }} />

          <Grid container>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle2" color="text.secondary">
                Organization
              </Typography>
              <Typography variant="body1">{result.organization}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle2" color="text.secondary">
                Category
              </Typography>
              <Typography variant="body1">{result.category}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle2" color="text.secondary">
                Status
              </Typography>
              <Chip
                label={result.status}
                color={
                  result.status.toLowerCase() === "published"
                    ? "success"
                    : "default"
                }
                size="small"
                sx={{ mt: 0.5 }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle2" color="text.secondary">
                Posted Date
              </Typography>
              <Typography variant="body1">
                {new Date(result.createdAt).toLocaleDateString()}
              </Typography>
            </Grid>
          </Grid>

          <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
            Description
          </Typography>
          <Typography
            variant="body1"
            paragraph
            sx={{ mb: 3, whiteSpace: "pre-line" }}
          >
            {result.description || "No description available"}
          </Typography>

          {result.downloadLink && (
            <Box sx={{ mt: 3 }}>
              <a
                href={result.downloadLink}
                target="_blank"
                rel="noopener noreferrer"
                style={{ textDecoration: "none" }}
              >
                <Chip
                  label="Download Result"
                  color="primary"
                  clickable
                  sx={{ "&:hover": { backgroundColor: "primary.dark" } }}
                />
              </a>
            </Box>
          )}
        </Paper>
      </div>
      <Footer />
    </>
  );
}
