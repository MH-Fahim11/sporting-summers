import { useQuery } from '@tanstack/react-query'
import useAxiosSecure from './useAxiosSecure';
import useAuth from './useAuth';
const useEnrolled = () => {
    const { user, loading } = useAuth();
    const [axiosSecure] = useAxiosSecure();
    const { erefetch, data: enrolled = [] } = useQuery({
        queryKey: ['enrolled', user?.email],
        enabled: !loading,
        queryFn: async () => {
            const res = await axiosSecure(`/enrolled?email=${user?.email}`)
            console.log('res from axios', res)
            return res.data;
        },
    })

    return [enrolled, erefetch]

}
export default useEnrolled;