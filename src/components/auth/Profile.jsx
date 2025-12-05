import React, { useEffect, useState } from 'react';
import { ORANGE, NAVY, BORDER } from '../../config/constants';
import { supabase } from '../../config/supabase';
import { StyledInput } from '../common/StyledInput';
import { FoodButton } from '../common/FoodButton';

export const Profile = ({ user, onClose }) => {
  const [profile, setProfile] = useState({ full_name: '', phone: '', address: '', barangay: '' });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (!user?.id) return;
    let cancelled = false;
    const load = async () => {
      try {
        const { data, error } = await supabase
          .from('user_profiles')
          .select('full_name, phone, address, barangay')
          .eq('id', user.id)
          .single();
        if (cancelled) return;
        if (error) return; // no profile yet
        if (data) setProfile({ full_name: data.full_name || '', phone: data.phone || '', address: data.address || '', barangay: data.barangay || '' });
      } catch (e) {
        // ignore
      }
    };
    load();
    return () => { cancelled = true; };
  }, [user]);

  const handleSave = async () => {
    if (!user?.id) return;
    setLoading(true);
    setMessage('');
    try {
      const payload = {
        id: user.id,
        full_name: profile.full_name,
        phone: profile.phone,
        address: profile.address,
        barangay: profile.barangay
      };

      const { error } = await supabase.from('user_profiles').upsert(payload);
      if (error) throw error;
      setMessage('Profile saved.');
      if (onClose) setTimeout(onClose, 900);
    } catch (e) {
      setMessage('Failed to save profile.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ backgroundColor: 'rgba(0,0,0,0.45)' }}>
      <div className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-md" style={{ border: `1px solid ${BORDER}` }}>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold" style={{ color: NAVY }}>Your Profile</h3>
          <button onClick={onClose} className="text-gray-500 font-semibold">Close</button>
        </div>

        <div className="space-y-3">
          <StyledInput placeholder="Full name" value={profile.full_name} onChange={e => setProfile(p => ({ ...p, full_name: e.target.value }))} />
          <StyledInput placeholder="Phone number" value={profile.phone} onChange={e => setProfile(p => ({ ...p, phone: e.target.value }))} />
          <StyledInput placeholder="Street / Unit / House No." value={profile.address} onChange={e => setProfile(p => ({ ...p, address: e.target.value }))} isTextArea rows={2} />
          <StyledInput placeholder="Barangay" value={profile.barangay} onChange={e => setProfile(p => ({ ...p, barangay: e.target.value }))} />
        </div>

        {message && <p className="text-sm text-gray-700 mt-3">{message}</p>}

        <div className="mt-4 flex space-x-3">
          <FoodButton onClick={handleSave} disabled={loading} style={{ backgroundColor: ORANGE }}>
            {loading ? 'Saving...' : 'Save Profile'}
          </FoodButton>
          <button onClick={onClose} className="flex-1 py-3 rounded-lg border font-semibold" style={{ borderColor: BORDER }}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
