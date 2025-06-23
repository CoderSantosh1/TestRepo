"use client";

import { useEffect, useState, useCallback, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button, type ButtonProps } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle, Clock, CheckCircle2, Flag, ArrowRight, Zap, Star, Hexagon, Brain, ArrowLeft, User } from 'lucide-react';
import Link from "next/link"
import AuthModal from '@/components/AuthModal';
import ConfirmationModal from "../../../components/ui/ConfirmationModal"
import { title } from 'process';

// ... existing code ...
// All user-facing English text is translated to Hindi below
// ... existing code ... 