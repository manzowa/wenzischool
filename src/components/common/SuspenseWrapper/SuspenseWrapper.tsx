// utils/SuspenseWrapper.tsx
import React, { Suspense } from 'react';
import { View } from 'react-native';
import { Loading } from '@/components/common/Loading';


export type SuspenseWrapperProps = {
  children: React.ReactNode;
  fallback?: React.ReactNode; // <- add this
};

export const SuspenseWrapper: React.FC<SuspenseWrapperProps> = ({ 
  children,
  fallback =<Loading />
}) => (
  <Suspense
    fallback={
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        {fallback}
      </View>
    }
  >
    {children}
  </Suspense>
);

export default SuspenseWrapper;