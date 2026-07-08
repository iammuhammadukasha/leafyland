import { useEffect, useState } from 'react';
import { api } from '../../lib/api';
import { useAuth } from '../../context/AuthContext';
import {
  Avatar,
  Badge,
  Btn,
  Card,
  EmptyState,
  PageHeader,
  TableWrap,
  Td,
  Th,
} from '../../components/admin/admin-ui';

type VendorRow = {
  id: string;
  shopName: string;
  approved: boolean;
  user: { email: string; name: string | null };
};

export function AdminVendors() {
  const { token } = useAuth();
  const [vendors, setVendors] = useState<VendorRow[]>([]);

  const load = () => {
    if (token) api.get<VendorRow[]>('/admin/vendors', token).then(setVendors);
  };

  useEffect(() => {
    load();
  }, [token]);

  const approve = async (id: string) => {
    if (!token) return;
    await api.patch(`/admin/vendors/${id}/approve`, {}, token);
    load();
  };

  return (
    <div>
      <PageHeader
        title="Vendors"
        subtitle="Approve and manage marketplace sellers"
        breadcrumb="Home / Vendors"
      />

      <Card title="Vendor Partners">
        <TableWrap>
          <thead>
            <tr>
              <Th>Shop</Th>
              <Th>Contact</Th>
              <Th>Status</Th>
              <Th>Action</Th>
            </tr>
          </thead>
          <tbody>
            {vendors.length === 0 ? (
              <tr>
                <td colSpan={4}>
                  <EmptyState message="No vendors registered" />
                </td>
              </tr>
            ) : (
              vendors.map((v) => (
                <tr key={v.id}>
                  <Td>
                    <div className="flex items-center gap-3">
                      <Avatar name={v.shopName} />
                      <p className="font-medium text-gray-800">{v.shopName}</p>
                    </div>
                  </Td>
                  <Td>
                    <p className="font-medium text-gray-800">{v.user.name ?? '—'}</p>
                    <p className="text-xs text-gray-500">{v.user.email}</p>
                  </Td>
                  <Td>
                    <Badge status={v.approved ? 'Approved' : 'Pending'} />
                  </Td>
                  <Td>
                    {!v.approved && (
                      <Btn size="sm" onClick={() => approve(v.id)}>
                        Approve
                      </Btn>
                    )}
                  </Td>
                </tr>
              ))
            )}
          </tbody>
        </TableWrap>
      </Card>
    </div>
  );
}
