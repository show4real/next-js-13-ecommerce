import { useState, useEffect } from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';

export const useFilterPersistence = (key, defaultValue) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const [value, setValue] = useState(defaultValue);

  useEffect(() => {
    // Get value from URL search params on mount
    const queryValue = searchParams.get(key);
    if (queryValue) {
      try {
        // Try to parse as JSON for arrays/objects, otherwise use as string
        const parsed = JSON.parse(queryValue);
        setValue(parsed);
      } catch {
        setValue(queryValue);
      }
    }
  }, [searchParams, key]);

  const updateValue = (newValue) => {
    setValue(newValue);
    
    // Create new URLSearchParams
    const params = new URLSearchParams(searchParams);
    
    if (newValue && (Array.isArray(newValue) ? newValue.length > 0 : newValue !== '')) {
      params.set(key, JSON.stringify(newValue));
    } else {
      params.delete(key);
    }
    
    // Update URL with new search params
    const newUrl = `${pathname}?${params.toString()}`;
    router.replace(newUrl, { scroll: false });
  };

  return [value, updateValue];
};