import Image from 'next/image';
import './index.css';

export default function PassGate() {
  return (
    <div className="page flex flex-col">
      <div className="group_1 flex flex-col">
        <div className="block_2 flex flex-row">
          <div className="group_2 flex flex-col">
            <Image
              className='image_1'
              src="/logo.png"
              alt="Password3 Logo"
              width={24}
              height={24}
              priority
            />
            <div className="section_1 flex flex-col">
              <div className="box_2 flex flex-row justify-between z-10">
                <div className="text-wrapper_1 flex flex-col">
                  <span className="text_3">设置下一道门</span>
                </div>
                <div className="text-wrapper_2 flex flex-col">
                  <span className="text_4">完成设置</span>
                </div>
              </div>
              <div className="box_3 flex flex-col">
                <div className="text-wrapper_3 flex flex-col">
                  <span className="text_5">请输入要设置的密码</span>
                </div>
              </div>
              <span className="text_6">请设置第一道门的钥匙</span>
            </div>
            <span className="text_7 z-10">设置后可以选择设置下一道门的密码，或者完成设置</span>
          </div>
        </div>
      </div>
    </div>
  );
}
