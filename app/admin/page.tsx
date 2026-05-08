'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useLanguage } from '@/lib/language-context';
import { getTranslation } from '@/lib/translations';
import { useAuth } from '@/lib/auth-context';

export default function AdminDashboardPage() {
  const router = useRouter();
  const { language } = useLanguage();
  const t = getTranslation(language);
  const { admin, token, logout } = useAuth();
  
  const [requests, setRequests] = useState<any[]>([]);
  const [professionals, setProfessionals] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedRequest, setSelectedRequest] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'requests' | 'professionals'>('requests');
  const [professionalModal, setProfessionalModal] = useState<{ mode: 'create' | 'edit' | null; data: any }>({ mode: null, data: null });
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [assigningProfessional, setAssigningProfessional] = useState<string | null>(null);

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!loading && !admin) {
      router.push('/admin/login');
    }
  }, [admin, loading, router]);

  // Fetch data from API
  useEffect(() => {
    const fetchData = async () => {
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        // Fetch requests
        const requestsRes = await fetch('/api/requests', {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (requestsRes.ok) {
          const requestsData = await requestsRes.json();
          setRequests(requestsData.requests || []);
        }

        // Fetch professionals
        const professionalsRes = await fetch('/api/professionals');
        if (professionalsRes.ok) {
          const professionalsData = await professionalsRes.json();
          setProfessionals(professionalsData.professionals || []);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [token]);

  const pendingRequests = requests.filter((r) => r.status === 'pending');
  const activeProjects = requests.filter((r) => r.status === 'in-progress');
  const completedProjects = requests.filter((r) => r.status === 'completed');
  const totalRevenue = completedProjects.length * 150; // Commission calculation

  const handleLogout = () => {
    logout();
    router.push('/admin/login');
  };

  const handleStatusUpdate = async (requestId: string, newStatus: string) => {
    if (!token) return;

    try {
      const response = await fetch(`/api/requests/${requestId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (response.ok) {
        // Refresh requests
        const requestsRes = await fetch('/api/requests', {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (requestsRes.ok) {
          const requestsData = await requestsRes.json();
          setRequests(requestsData.requests || []);
        }
        setSelectedRequest(null);
      }
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const handleAssignProfessional = async (requestId: string, professionalId: string) => {
    if (!token) return;

    try {
      const response = await fetch(`/api/requests/${requestId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ assignedProfessional: professionalId }),
      });

      if (response.ok) {
        // Refresh requests
        const requestsRes = await fetch('/api/requests', {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (requestsRes.ok) {
          const requestsData = await requestsRes.json();
          setRequests(requestsData.requests || []);
        }
        setAssigningProfessional(null);
        alert(language === 'en' ? 'Professional assigned successfully!' : 'Professionnel assigné avec succès!');
      }
    } catch (error) {
      console.error('Error assigning professional:', error);
      alert(language === 'en' ? 'Error assigning professional' : 'Erreur lors de l\'affectation du professionnel');
    }
  };

  const fetchProfessionals = async () => {
    try {
      // Add cache busting to ensure fresh data
      const response = await fetch(`/api/professionals?admin=true&_t=${Date.now()}`);
      if (response.ok) {
        const data = await response.json();
        console.log('Fetched professionals:', data.professionals);
        setProfessionals(data.professionals || []);
      }
    } catch (error) {
      console.error('Error fetching professionals:', error);
    }
  };

  const handleCreateProfessional = () => {
    setProfessionalModal({
      mode: 'create',
      data: {
        name: '',
        bio: '',
        bioFr: '',
        skills: [],
        location: '',
        hourlyRate: 0,
        avatar: 'https://i.pravatar.cc/150',
        categories: [],
        languages: [],
        title: '',
        isActive: true,
      },
    });
  };

  const handleEditProfessional = (professional: any) => {
    setProfessionalModal({
      mode: 'edit',
      data: { 
        ...professional,
        title: professional.title || '',
        languages: professional.languages || [],
        skills: professional.skills || [],
        categories: professional.categories || [],
      },
    });
  };

  const handleSaveProfessional = async (e: React.FormEvent) => {
    e.preventDefault();
    
    console.log('=== SAVE PROFESSIONAL TRIGGERED ===');
    console.log('Token exists:', !!token);
    console.log('Modal data exists:', !!professionalModal.data);
    console.log('Modal mode:', professionalModal.mode);
    
    if (!token) {
      alert('No authentication token found. Please log in again.');
      return;
    }
    
    if (!professionalModal.data) {
      alert('No professional data found.');
      return;
    }

    try {
      const url = professionalModal.mode === 'create'
        ? '/api/professionals'
        : `/api/professionals/${professionalModal.data._id}`;
      
      const method = professionalModal.mode === 'create' ? 'POST' : 'PUT';

      console.log('Making request to:', url);
      console.log('Method:', method);
      console.log('Saving professional data:', professionalModal.data);

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(professionalModal.data),
      });

      console.log('Response status:', response.status);

      if (response.ok) {
        const result = await response.json();
        console.log('Save response:', result);
        await fetchProfessionals();
        setProfessionalModal({ mode: null, data: null });
        alert(professionalModal.mode === 'create' 
          ? 'Professional created successfully!' 
          : 'Professional updated successfully!');
      } else {
        const error = await response.json();
        console.error('Save error:', error);
        alert(`Error: ${error.error || 'Failed to save professional'}`);
      }
    } catch (error) {
      console.error('Error saving professional:', error);
      alert('Error saving professional: ' + (error as Error).message);
    }
  };

  const handleDeleteProfessional = async (id: string) => {
    if (!token) return;

    try {
      const response = await fetch(`/api/professionals/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        await fetchProfessionals();
        setDeleteConfirm(null);
      } else {
        const error = await response.json();
        alert(`Error: ${error.error || 'Failed to delete professional'}`);
      }
    } catch (error) {
      console.error('Error deleting professional:', error);
      alert('Error deleting professional');
    }
  };

  const updateFormField = (field: string, value: any) => {
    console.log(`Updating field ${field} to:`, value);
    setProfessionalModal((prev) => {
      const updated = {
        ...prev,
        data: prev.data ? { ...prev.data, [field]: value } : null,
      };
      console.log('Updated modal data:', updated.data);
      return updated;
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'in-progress':
        return 'bg-blue-100 text-blue-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending':
        return language === 'en' ? 'Pending' : 'En Attente';
      case 'in-progress':
        return language === 'en' ? 'In Progress' : 'En Cours';
      case 'completed':
        return language === 'en' ? 'Completed' : 'Complété';
      case 'cancelled':
        return language === 'en' ? 'Cancelled' : 'Annulé';
      default:
        return status;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-600">{language === 'en' ? 'Loading...' : 'Chargement...'}</div>
      </div>
    );
  }

  if (!admin) {
    return null; // Will redirect to login
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">{t.adminTitle}</h1>
            <p className="text-gray-600">
              {language === 'en'
                ? 'Manage client requests and professionals'
                : 'Gérer les demandes clients et les professionnels'}
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm text-gray-600">{language === 'en' ? 'Logged in as' : 'Connecté en tant que'}</p>
              <p className="font-semibold text-gray-900">{admin?.email}</p>
            </div>
            <button
              onClick={handleLogout}
              className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
            >
              {language === 'en' ? 'Logout' : 'Déconnexion'}
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="mb-8 border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('requests')}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition ${
                activeTab === 'requests'
                  ? 'border-emerald-600 text-emerald-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {language === 'en' ? 'Client Requests' : 'Demandes Clients'}
            </button>
            <button
              onClick={() => setActiveTab('professionals')}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition ${
                activeTab === 'professionals'
                  ? 'border-emerald-600 text-emerald-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {language === 'en' ? 'Professionals' : 'Professionnels'}
            </button>
          </nav>
        </div>

        {/* Requests Tab */}
        {activeTab === 'requests' && (
          <div>
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">{t.pendingRequests}</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">
                  {pendingRequests.length}
                </p>
              </div>
              <div className="bg-yellow-100 p-3 rounded-full">
                <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">{t.activeProjects}</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">
                  {activeProjects.length}
                </p>
              </div>
              <div className="bg-blue-100 p-3 rounded-full">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">{t.completedProjects}</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">
                  {completedProjects.length}
                </p>
              </div>
              <div className="bg-green-100 p-3 rounded-full">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">{t.totalRevenue}</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">
                  ${totalRevenue}
                </p>
              </div>
              <div className="bg-emerald-100 p-3 rounded-full">
                <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Requests Table */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-bold text-gray-900">
              {language === 'en' ? 'All Requests' : 'Toutes les Demandes'}
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {language === 'en' ? 'Client' : 'Client'}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {language === 'en' ? 'Professional Type' : 'Type de Professionnel'}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {language === 'en' ? 'Budget' : 'Budget'}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {language === 'en' ? 'Status' : 'Statut'}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {language === 'en' ? 'Assigned To' : 'Assigné à'}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {language === 'en' ? 'Actions' : 'Actions'}
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {requests.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                      {language === 'en' ? 'No requests found' : 'Aucune demande trouvée'}
                    </td>
                  </tr>
                ) : (
                  requests.map((request) => (
                    <tr key={request._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {request.clientName}
                        </div>
                        <div className="text-sm text-gray-500">{request.clientEmail}</div>
                        <div className="text-sm text-gray-500">{request.clientPhone}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{request.category}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">${request.budget}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(
                            request.status
                          )}`}
                        >
                          {getStatusText(request.status)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {request.assignedProfessional?.name || '-'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button
                          onClick={() => setSelectedRequest(request._id)}
                          className="text-emerald-600 hover:text-emerald-900"
                        >
                          {language === 'en' ? 'View' : 'Voir'}
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Request Details Modal (Simplified) */}
        {selectedRequest && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50" onClick={() => setSelectedRequest(null)}>
            <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-8" onClick={(e) => e.stopPropagation()}>
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-gray-900">
                  {t.requestDetails}
                </h3>
                <button
                  onClick={() => setSelectedRequest(null)}
                  className="text-gray-500 hover:text-gray-700 transition"
                  aria-label="Close modal"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              {(() => {
                const request = requests.find((r) => r._id === selectedRequest);
                if (!request) return null;
                return (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        {language === 'en' ? 'Client Name' : 'Nom du Client'}
                      </label>
                      <p className="mt-1 text-gray-900">{request.clientName}</p>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          {language === 'en' ? 'Email' : 'Email'}
                        </label>
                        <p className="mt-1 text-gray-900">{request.clientEmail}</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          {language === 'en' ? 'Phone' : 'Téléphone'}
                        </label>
                        <p className="mt-1 text-gray-900">{request.clientPhone}</p>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        {language === 'en' ? 'Category' : 'Catégorie'}
                      </label>
                      <p className="mt-1 text-gray-900">{request.category}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        {language === 'en' ? 'Project Title' : 'Titre du Projet'}
                      </label>
                      <p className="mt-1 text-gray-900 font-semibold">{request.projectTitle}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        {language === 'en' ? 'Project Description' : 'Description du Projet'}
                      </label>
                      <p className="mt-1 text-gray-900">{request.projectDescription}</p>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          {language === 'en' ? 'Budget' : 'Budget'}
                        </label>
                        <p className="mt-1 text-gray-900">${request.budget}</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          {language === 'en' ? 'Timeline' : 'Délai'}
                        </label>
                        <p className="mt-1 text-gray-900">{request.timeline}</p>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        {language === 'en' ? 'Current Status' : 'Statut Actuel'}
                      </label>
                      <span className={`mt-1 inline-block px-3 py-1 text-sm rounded-full ${getStatusColor(request.status)}`}>
                        {getStatusText(request.status)}
                      </span>
                    </div>
                    <div className="pt-4 border-t">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {language === 'en' ? 'Assigned Professional' : 'Professionnel Assigné'}
                      </label>
                      {request.assignedProfessional ? (
                        <div className="bg-gray-50 p-3 rounded-lg mb-3">
                          <p className="text-gray-900 font-medium">{request.assignedProfessional.name}</p>
                          <p className="text-gray-600 text-sm">{request.assignedProfessional.title || '-'}</p>
                        </div>
                      ) : (
                        <p className="text-gray-500 mb-3">{language === 'en' ? 'No professional assigned yet' : 'Aucun professionnel assigné'}</p>
                      )}
                      <button 
                        onClick={() => setAssigningProfessional(request._id)}
                        className="w-full bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition"
                      >
                        {language === 'en' ? 'Assign / Change Professional' : 'Assigner / Changer le Professionnel'}
                      </button>
                    </div>
                    <div className="pt-4 border-t">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {language === 'en' ? 'Update Status' : 'Mettre à jour le statut'}
                      </label>
                      <div className="flex flex-wrap gap-2">
                        <button
                          onClick={() => handleStatusUpdate(request._id, 'pending')}
                          className="px-4 py-2 bg-yellow-100 text-yellow-800 rounded hover:bg-yellow-200"
                        >
                          {language === 'en' ? 'Pending' : 'En Attente'}
                        </button>
                        <button
                          onClick={() => handleStatusUpdate(request._id, 'in-progress')}
                          className="px-4 py-2 bg-blue-100 text-blue-800 rounded hover:bg-blue-200"
                        >
                          {language === 'en' ? 'In Progress' : 'En Cours'}
                        </button>
                        <button
                          onClick={() => handleStatusUpdate(request._id, 'completed')}
                          className="px-4 py-2 bg-green-100 text-green-800 rounded hover:bg-green-200"
                        >
                          {language === 'en' ? 'Completed' : 'Complété'}
                        </button>
                        <button
                          onClick={() => handleStatusUpdate(request._id, 'cancelled')}
                          className="px-4 py-2 bg-red-100 text-red-800 rounded hover:bg-red-200"
                        >
                          {language === 'en' ? 'Cancelled' : 'Annulé'}
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })()}
            </div>
          </div>
        )}

        {/* Assign Professional Modal */}
        {assigningProfessional && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50" onClick={() => setAssigningProfessional(null)}>
            <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-8" onClick={(e) => e.stopPropagation()}>
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-gray-900">
                  {language === 'en' ? 'Assign Professional' : 'Assigner un Professionnel'}
                </h3>
                <button
                  onClick={() => setAssigningProfessional(null)}
                  className="text-gray-500 hover:text-gray-700 transition"
                  aria-label="Close modal"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="space-y-3">
                {professionals.length === 0 ? (
                  <p className="text-gray-500 text-center py-8">
                    {language === 'en' ? 'No professionals available' : 'Aucun professionnel disponible'}
                  </p>
                ) : (
                  professionals.map((professional) => (
                    <div
                      key={professional._id}
                      className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition"
                    >
                      <div className="flex items-center gap-4">
                        <img
                          src={professional.avatar}
                          alt={professional.name}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                        <div>
                          <p className="font-semibold text-gray-900">{professional.name}</p>
                          <p className="text-sm text-gray-600">{professional.title || '-'}</p>
                          <p className="text-sm text-gray-500">{professional.location}</p>
                        </div>
                      </div>
                      <button
                        onClick={() => handleAssignProfessional(assigningProfessional, professional._id)}
                        className="bg-emerald-600 text-white px-6 py-2 rounded-lg hover:bg-emerald-700 transition"
                      >
                        {language === 'en' ? 'Assign' : 'Assigner'}
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        )}
          </div>
        )}

        {/* Professionals Tab */}
        {activeTab === 'professionals' && (
          <div>
            <div className="mb-6 flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">
                {language === 'en' ? 'Manage Professionals' : 'Gérer les Professionnels'}
              </h2>
              <button
                onClick={handleCreateProfessional}
                className="bg-emerald-600 text-white px-6 py-3 rounded-lg hover:bg-emerald-700 transition font-semibold flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                {language === 'en' ? 'Add Professional' : 'Ajouter un Professionnel'}
              </button>
            </div>

            {/* Professionals Table */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        {language === 'en' ? 'Name' : 'Nom'}
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        {language === 'en' ? 'Title' : 'Titre'}
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        {language === 'en' ? 'Location' : 'Localisation'}
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        {language === 'en' ? 'Hourly Rate' : 'Taux Horaire'}
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        {language === 'en' ? 'Status' : 'Statut'}
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        {language === 'en' ? 'Actions' : 'Actions'}
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {professionals.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                          {language === 'en' ? 'No professionals found' : 'Aucun professionnel trouvé'}
                        </td>
                      </tr>
                    ) : (
                      professionals.map((professional) => (
                        <tr key={professional._id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <img
                                src={professional.avatar}
                                alt={professional.name}
                                className="w-10 h-10 rounded-full object-cover"
                              />
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">
                                  {professional.name}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">{professional.title || '-'}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">{professional.location}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">${professional.hourlyRate}/hr</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span
                              className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                professional.isActive
                                  ? 'bg-green-100 text-green-800'
                                  : 'bg-red-100 text-red-800'
                              }`}
                            >
                              {professional.isActive
                                ? language === 'en' ? 'Active' : 'Actif'
                                : language === 'en' ? 'Inactive' : 'Inactif'}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <button
                              onClick={() => handleEditProfessional(professional)}
                              className="text-emerald-600 hover:text-emerald-900 mr-4"
                            >
                              {language === 'en' ? 'Edit' : 'Modifier'}
                            </button>
                            <button
                              onClick={() => setDeleteConfirm(professional._id)}
                              className="text-red-600 hover:text-red-900"
                            >
                              {language === 'en' ? 'Delete' : 'Supprimer'}
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Professional Create/Edit Modal */}
        {professionalModal.mode && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50" onClick={() => setProfessionalModal({ mode: null, data: null })}>
            <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
              <form onSubmit={handleSaveProfessional} className="p-8">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-2xl font-bold text-gray-900">
                    {professionalModal.mode === 'create'
                      ? language === 'en' ? 'Add Professional' : 'Ajouter un Professionnel'
                      : language === 'en' ? 'Edit Professional' : 'Modifier le Professionnel'}
                  </h3>
                  <button
                    type="button"
                    onClick={() => setProfessionalModal({ mode: null, data: null })}
                    className="text-gray-500 hover:text-gray-700 transition"
                    aria-label="Close modal"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {language === 'en' ? 'Name' : 'Nom'} *
                    </label>
                    <input
                      type="text"
                      required
                      value={professionalModal.data.name}
                      onChange={(e) => updateFormField('name', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500 text-gray-900 bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {language === 'en' ? 'Title' : 'Titre'}
                    </label>
                    <input
                      type="text"
                      value={professionalModal.data.title || ''}
                      onChange={(e) => updateFormField('title', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500 text-gray-900 bg-white"
                      placeholder={language === 'en' ? 'e.g. Full Stack Developer' : 'ex: Développeur Full Stack'}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {language === 'en' ? 'Location' : 'Localisation'} *
                    </label>
                    <input
                      type="text"
                      required
                      value={professionalModal.data.location}
                      onChange={(e) => updateFormField('location', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500 text-gray-900 bg-white"
                      placeholder={language === 'en' ? 'e.g. Dakar, Senegal' : 'ex: Dakar, Sénégal'}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {language === 'en' ? 'Hourly Rate ($)' : 'Taux Horaire ($)'} *
                    </label>
                    <input
                      type="number"
                      required
                      min="0"
                      value={professionalModal.data.hourlyRate}
                      onChange={(e) => updateFormField('hourlyRate', parseFloat(e.target.value))}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500 text-gray-900 bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {language === 'en' ? 'Avatar URL' : 'URL de l\'Avatar'}
                    </label>
                    <input
                      type="url"
                      value={professionalModal.data.avatar}
                      onChange={(e) => updateFormField('avatar', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500 text-gray-900 bg-white"
                      placeholder="https://example.com/avatar.jpg"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {language === 'en' ? 'Status' : 'Statut'}
                    </label>
                    <select
                      value={professionalModal.data.isActive ? 'active' : 'inactive'}
                      onChange={(e) => updateFormField('isActive', e.target.value === 'active')}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500 text-gray-900 bg-white"
                      aria-label="Professional status"
                    >
                      <option value="active">{language === 'en' ? 'Active' : 'Actif'}</option>
                      <option value="inactive">{language === 'en' ? 'Inactive' : 'Inactif'}</option>
                    </select>
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {language === 'en' ? 'Bio (English)' : 'Bio (Anglais)'} *
                    </label>
                    <textarea
                      required
                      rows={3}
                      value={professionalModal.data.bio}
                      onChange={(e) => updateFormField('bio', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500 text-gray-900 bg-white"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {language === 'en' ? 'Bio (French)' : 'Bio (Français)'} *
                    </label>
                    <textarea
                      required
                      rows={3}
                      value={professionalModal.data.bioFr}
                      onChange={(e) => updateFormField('bioFr', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500 text-gray-900 bg-white"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {language === 'en' ? 'Skills (comma-separated)' : 'Compétences (séparées par des virgules)'}
                    </label>
                    <input
                      type="text"
                      value={(professionalModal.data.skills || []).join(', ')}
                      onChange={(e) => updateFormField('skills', e.target.value.split(',').map((s: string) => s.trim()).filter(Boolean))}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500 text-gray-900 bg-white"
                      placeholder={language === 'en' ? 'e.g. React, Node.js, TypeScript' : 'ex: React, Node.js, TypeScript'}
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {language === 'en' ? 'Languages (comma-separated)' : 'Langues (séparées par des virgules)'}
                    </label>
                    <input
                      type="text"
                      value={(professionalModal.data.languages || []).join(', ')}
                      onChange={(e) => updateFormField('languages', e.target.value.split(',').map((s: string) => s.trim()).filter(Boolean))}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500 text-gray-900 bg-white"
                      placeholder={language === 'en' ? 'e.g. English, French, Wolof' : 'ex: Anglais, Français, Wolof'}
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {language === 'en' ? 'Categories (comma-separated)' : 'Catégories (séparées par des virgules)'}
                    </label>
                    <input
                      type="text"
                      value={(professionalModal.data.categories || []).join(', ')}
                      onChange={(e) => updateFormField('categories', e.target.value.split(',').map((s: string) => s.trim()).filter(Boolean))}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500 text-gray-900 bg-white"
                      placeholder={language === 'en' ? 'e.g. Web Development, Mobile Development' : 'ex: Développement Web, Développement Mobile'}
                    />
                  </div>
                </div>

                <div className="mt-8 flex justify-end gap-4">
                  <button
                    type="button"
                    onClick={() => setProfessionalModal({ mode: null, data: null })}
                    className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition"
                  >
                    {language === 'en' ? 'Cancel' : 'Annuler'}
                  </button>
                  <button
                    type="submit"
                    onClick={() => console.log('Submit button clicked!')}
                    className="px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition"
                  >
                    {professionalModal.mode === 'create'
                      ? language === 'en' ? 'Create' : 'Créer'
                      : language === 'en' ? 'Update' : 'Mettre à jour'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {deleteConfirm && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50" onClick={() => setDeleteConfirm(null)}>
            <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-8" onClick={(e) => e.stopPropagation()}>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                {language === 'en' ? 'Confirm Delete' : 'Confirmer la Suppression'}
              </h3>
              <p className="text-gray-600 mb-6">
                {language === 'en'
                  ? 'Are you sure you want to delete this professional? This action cannot be undone.'
                  : 'Êtes-vous sûr de vouloir supprimer ce professionnel? Cette action ne peut pas être annulée.'}
              </p>
              <div className="flex justify-end gap-4">
                <button
                  onClick={() => setDeleteConfirm(null)}
                  className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition"
                >
                  {language === 'en' ? 'Cancel' : 'Annuler'}
                </button>
                <button
                  onClick={() => handleDeleteProfessional(deleteConfirm)}
                  className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                >
                  {language === 'en' ? 'Delete' : 'Supprimer'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
